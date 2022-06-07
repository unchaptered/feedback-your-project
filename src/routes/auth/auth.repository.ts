import { inject } from 'inversify';
import { QueryResult } from 'pg';
import { provide } from 'inversify-binding-decorators';

// DI Constatns
import { REPOSITORIES, BUILDERS, FACTORIES } from '../../constants/constant.loader';

// Classes (Layer & Modules)
import { BaseLayer } from '../base/base.layer';
import { DevQueryBuilder, PostgresFactory } from '../../modules/module.loader';

// Dtos (Classes)
import {
    CustomException, BadRequestException, NotFoundException,
    DevForToken
} from '../../models/class.loader';


@provide(REPOSITORIES.AuthRepository)
export class AuthRepository extends BaseLayer{

    constructor(
        // Modules
        @inject(BUILDERS.DevQueryBuilder) private devQuery: DevQueryBuilder,
        @inject(FACTORIES.PostgresFactory) private pgFactory: PostgresFactory
    ) {
        super();
    }

    
    public async publishToken(iDev: DevForToken, token: string): Promise<QueryResult> {

        const client = await this.pgFactory.getClient();
        if (client instanceof CustomException) throw client;

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
            
            throw this.errorHandler(err);
        }

    }
}