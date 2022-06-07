import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { QueryResult } from 'pg';

// DI Constatns
import { REPOSITORIES, BUILDERS, FACTORIES } from '../../constants/constant.loader';

// Classes (Layer & Modules)
import { BaseLayer } from '../base/base.layer';
import { DevQueryBuilder, PostgresFactory } from '../../modules/module.loader';

// Dtos (Classes)
import {
    CustomException, BadRequestException, ConflictException, NotFoundException,
    DevForJoin, DevForLogin
} from '../../models/class.loader';


@provide(REPOSITORIES.HomeRepository)
export class HomeRepository extends BaseLayer {

    constructor(
        // Modules
        @inject(BUILDERS.DevQueryBuilder) private devQuery: DevQueryBuilder,
        @inject(FACTORIES.PostgresFactory) private pgFactory: PostgresFactory
    ) {
        super();
    }

    public async join(iDev: DevForJoin): Promise<QueryResult> {
        
        const client = await this.pgFactory.getClient();
        if (client instanceof CustomException) throw client;

        const findQuery: string = this.devQuery.isExists(iDev.name, iDev.email);
        const joinQuery: string = this.devQuery.join(iDev);

        try{ 
            client.query('BEGIN;');

            const isExists = await client.query(findQuery);
            if (isExists.rowCount > 0) throw new ConflictException('이름 혹은 이메일이 사용 중입니다.');

            const result = await client.query(joinQuery);
            client.query('COMMIT;');
            client.release();

            return result;
        } catch (err) {
            client.query('ROLLBACK;');
            client.release();

            throw this.errorHandler(err);
        }
        
    }

    public async login(iDev: DevForLogin): Promise<QueryResult> {

        const client = await this.pgFactory.getClient();
        if (client instanceof CustomException) throw client;

        const findQuery: string = this.devQuery.isExistsByEamil(iDev.email);
        const loginQuery = this.devQuery.login(iDev);

        try{ 
            client.query('BEGIN;');
            const isExists = await client.query(findQuery);
            if (isExists.rowCount === 0) throw new NotFoundException('가입된 이메일이 아닙니다.');

            const result = await client.query(loginQuery);
            if (result.rowCount === 0 ) throw new BadRequestException('비밀번호가 일치하지 않습니다.');
            
            client.query('COMMIT;');
            client.release();

            return result;
        } catch (err) {
            client.query('ROLLBACK;');
            client.release();
            
            throw this.errorHandler(err);
        }

    }

}