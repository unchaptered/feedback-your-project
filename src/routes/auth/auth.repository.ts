import { inject } from 'inversify';
import { QueryResult } from 'pg';
import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/constant.loader';

// Dtos
import { IDevForLogin, IDevForToken } from '../../models/interface.loader';
import { BadRequestException, NotFoundException } from '../../models/class.loader';

// Providers
import { DevQueryBuilder, PostgresFactory } from '../../modules/module.loader';


@provide(MODULES.AuthRepository)
export class AuthRepository {

    constructor(
        @inject(MODULES.DevQueryBuilder) private devQuery: DevQueryBuilder,
        @inject(MODULES.PostgresFactory) private pgFactory: PostgresFactory
    ) {}

    private errHandler(err: unknown): Error {
        if (err instanceof Error) return err;
        else return new Error('Unkwon Error : ' + JSON.stringify(err));
    }
    
    public async publishToken(iDev: IDevForToken, token: string): Promise<QueryResult | Error | NotFoundException | BadRequestException> {

        console.log('helo');

        const client = await this.pgFactory.getClient();
        if (client instanceof Error) return client;

        const findQuery: string = this.devQuery.isExistsByEamil(iDev.email);
        const loginQuery = this.devQuery.login({ email: iDev.email, password:iDev.password });

        try{ 
            client.query('BEGIN;');

            const [
                loginUser,
                saveToken
            ] = await Promise.all([
                (async () => {
                    const isExists = await client.query(findQuery);
                    if (isExists.rowCount === 0) throw new NotFoundException('가입된 이메일이 아닙니다.');

                    const result = await client.query(loginQuery);
                    if (result.rowCount === 0 ) throw new BadRequestException('비밀번호가 일치하지 않습니다.');
                    if (result.rows[0].id !== iDev.id) throw new BadRequestException('id 가 일치하지 않습니다.');

                    return result;
                })(),
                (async () => {
                    const devId = iDev.id;

                    const deleteQuery = this.devQuery.deleteRefreshToken(devId);
                    const saveQuery = this.devQuery.saveRefreshToken(devId, token);

                    await client.query(deleteQuery);
                    const result = await client.query(saveQuery);
                    
                    return result;
                })()
            ]);
            
            client.query('COMMIT;');
            client.release();

            return saveToken;
        } catch (err) {
            client.query('ROLLBACK;');
            client.release();
            
            return this.errHandler(err);
        }

    }
}