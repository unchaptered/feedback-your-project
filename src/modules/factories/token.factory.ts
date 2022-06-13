import * as jwt from 'jsonwebtoken';
import { provide } from 'inversify-binding-decorators';
import { JwtPayload, NotBeforeError, TokenExpiredError, JsonWebTokenError} from 'jsonwebtoken';

// DI Constnats
import { FACTORIES } from '../../constants/constant.loader';

// Dtos (Interfaces)
import { ITokenConfig } from '../../models/interface.loader';
import { ITokenFactory } from './interfaces/i.token.factory';


@provide(FACTORIES.TokenFactory)
export class TokenFactory implements ITokenFactory {

    static tokenConfig: ITokenConfig;

    static async initialize(tokenConfig: ITokenConfig): Promise<ITokenConfig> {

        TokenFactory.tokenConfig = tokenConfig;

        return this.tokenConfig;

    }

    /**
     * 
     * @param `string`
     * @returns `token.split('Bearer ')[1]`
     */
    public extract(token: Array<any> | string | undefined): string | undefined {

        if (token instanceof Array) return token[0]?.split('Bearer ')[1];
        else return token?.split('Bearer ')[1];

    }

    public getAccessToken(): string {
        

        const { tokenConfig } = TokenFactory;
        
        return jwt.sign({}, tokenConfig.SECRET, {
            algorithm: tokenConfig.ALGORITHM,
            expiresIn: tokenConfig.ACCESS_EXPIRED
        });
        
    }

    public getRefreshToken(data: object): string {

        const { tokenConfig } = TokenFactory;
        
        return jwt.sign(data, tokenConfig.SECRET, {
            algorithm: tokenConfig.ALGORITHM,
            expiresIn: tokenConfig.REFRESH_EXPIRED
        });

    }

    // verify 는 signiture 를 확인합니다.
    public verifyToken(token: string): JwtPayload | Error {

        const { tokenConfig } = TokenFactory;

        try {
            return jwt.verify(token, tokenConfig.SECRET, { complete: true });
        } catch(err) {
            if (err instanceof NotBeforeError) return err;
            else if (err instanceof TokenExpiredError) return err;
            else if (err instanceof JsonWebTokenError) return err;
            else return new Error('UnknownJWTError : ' + JSON.stringify(err));
        }

    }

    // decode 는 signiture 를 확인하지 않습니다.
    public decodeToken(token: string): JwtPayload | null | Error  {

        const { tokenConfig } = TokenFactory;

        try {
            return jwt.decode(token, { complete: true });
        } catch(err) {
            if (err instanceof NotBeforeError) return err;
            else if (err instanceof TokenExpiredError) return err;
            else if (err instanceof JsonWebTokenError) return err;
            else return new Error('UnknownJWTError : ' + JSON.stringify(err));
        }

    }


}