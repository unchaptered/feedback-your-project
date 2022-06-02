import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { QueryResult } from 'pg';

// di
import { MODULES } from '../../constants/constant.loader';

//dto
import { IDevForJoin, IDevForLogin } from '../../models/interface.loader';
import { BadRequestException, ConflictException, NotFoundException } from '../../models/class.loader';

// providers
import { DevQueryBuilder, PostgresFactory } from '../../modules/module.loader';


@provide(MODULES.HomeRepository)
export class HomeRepository {

    constructor(
        @inject(MODULES.DevQueryBuilder) private devQuery: DevQueryBuilder,
        @inject(MODULES.PostgresFactory) private pgFactory: PostgresFactory
    ) {}

    private errHandler(err: unknown): Error {
        if (err instanceof Error) return err;
        else return new Error('Unkwon Error : ' + JSON.stringify(err));
    }

    public async join(iDev: IDevForJoin): Promise<QueryResult | Error | ConflictException> {
        
        const client = await this.pgFactory.getClient();
        if (client instanceof Error) return client;

        const findQuery: string = this.devQuery.isExists(iDev.name, iDev.email);
        const joinQuery: string = this.devQuery.join(iDev);

        try{ 
            client.query('BEGIN;');

            const isExists = await client.query(findQuery);
            if (isExists.rowCount > 0) return new ConflictException('이름 혹은 이메일이 사용 중입니다.');

            const result = await client.query(joinQuery);
            client.query('COMMIT;');
            client.release();

            return result;
        } catch (err) {
            client.query('ROLLBACK;');
            client.release();

            return this.errHandler(err);
        }
        
    }

    public async login(iDev: IDevForLogin): Promise<QueryResult | Error | NotFoundException | BadRequestException> {

        const client = await this.pgFactory.getClient();
        if (client instanceof Error) return client;

        const findQuery: string = this.devQuery.isExistsByEamil(iDev.email);
        const loginQuery = this.devQuery.login(iDev);

        try{ 
            client.query('BEGIN;');
            const isExists = await client.query(findQuery);
            if (isExists.rowCount === 0) return new NotFoundException('가입된 이메일이 아닙니다.');

            const result = await client.query(loginQuery);
            if (result.rowCount === 0 ) return new BadRequestException('비밀번호가 일치하지 않습니다.');
            
            client.query('COMMIT;');
            client.release();

            return result;
        } catch (err) {
            client.query('ROLLBACK;');
            client.release();
            
            return this.errHandler(err);
        }

    }

}