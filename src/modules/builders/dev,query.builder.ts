import { provide } from 'inversify-binding-decorators';

// DI Conastants
import { BUILDERS } from '../../constants/constant.loader';
import { IDevQueryBuilder } from './interfaces/i.dev.query.builder';

// Dtos
import { IDevForJoin, IDevForLogin } from '../../models/interface.loader';
import { SiteUrl, SiteForPost, SiteForPut, Site } from '../../models/class.loader';


@provide(BUILDERS.DevQueryBuilder)
export class DevQueryBuilder implements IDevQueryBuilder {

    constructor() {}

    public isExistsByName(n: string): string {
        return `SELECT id FROM dev WHERE name='${n}';`;
    }

    public isExistsByEamil(e: string): string {
        return `SELECT id FROM dev WHERE email='${e}';`;
    }

    public isExists(n: string, e: string): string {
        return `SELECT id FROM dev WHERE name='${n}' AND email='${e}';`;
    }

    public join(V: IDevForJoin): string {

        return `INSERT INTO dev (email, name, password) VALUES ('${V.email}', '${V.name}', '${V.password}');`;

    }

    public login(V: IDevForLogin): string {

        return `SELECT id, name, email FROM dev WHERE email='${V.email}' AND password='${V.password}';`;

    }

    public deleteRefreshToken(id: number): string {

        return `DELETE FROM dev_token WHERE dev_id=${id};`;
    }
    public saveRefreshToken(id: number, token: string): string {

        return `INSERT INTO dev_token (dev_id, token_value) VALUES (${id}, '${token}');`;

    }

}