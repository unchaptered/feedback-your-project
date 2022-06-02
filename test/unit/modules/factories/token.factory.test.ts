import 'reflect-metadata';
import * as jwt from 'jsonwebtoken';
import { JwtPayload, NotBeforeError, TokenExpiredError, JsonWebTokenError} from 'jsonwebtoken';

// Testing Module
import { TokenFactory } from '../../../../src/modules/module.loader';
import { ITokenConfig } from '../../../../src/models/interface.loader';
import mockCreator from '../../../mock/mock.creator';


describe ('Token Factory', () => {

    
    it ('has 1 static props', () => expect(Object.keys(TokenFactory).length).toBe(1));
    it ('has 4 props', () => {
        const tmp = new TokenFactory();
        expect(Object.keys(tmp).length).toBe(0);

        expect(typeof tmp.getAccessToken).toBe('function');
        expect(typeof tmp.getRefreshToken).toBe('function');
        expect(typeof tmp.verifyToken).toBe('function');
        expect(typeof tmp.decodeToken).toBe('function');
    });


    describe ('logics', () => {

        let tokenConfig: ITokenConfig;
        let tokenFactory: TokenFactory;
        let sampleData: { name: string };

        beforeAll(async () => {
            // testsdamfladmsk12
            // access token 30s
            // refresh token 60s
            tokenConfig = mockCreator.Config.iTokenConfig.createITokenConf();
            await TokenFactory.initialize(tokenConfig);
            tokenFactory = new TokenFactory();
            sampleData = { name: 'unchaptered '};

        });

        beforeEach(() => jest.useFakeTimers());
        afterEach(() => jest.runAllTimers());

        describe ('this.sign', () => {

            it ('Access Token', () => expect(tokenFactory.getAccessToken()).toBeDefined());
            it ('Refresh Token', () => expect(tokenFactory.getRefreshToken(sampleData)).toBeDefined());
            
        });

        describe('this.verify', () => {

            describe('with AccessToken', () => {

                it ('should return Payload', () => {

                    const token = tokenFactory.getAccessToken();
                    const res = tokenFactory.verifyToken(token);

                    expect(res).not.toBeInstanceOf(NotBeforeError);
                    expect(res).not.toBeInstanceOf(TokenExpiredError);
                    expect(res).not.toBeInstanceOf(JsonWebTokenError);
                    
                });
    
                it ('should return JsonWebTokenError', () => {
    
                    const token = jwt.sign({}, 'wrong_key');
                    const res = tokenFactory.verifyToken(token);

                    expect(res).not.toBeInstanceOf(NotBeforeError);
                    expect(res).not.toBeInstanceOf(TokenExpiredError);
                    expect(res).toBeInstanceOf(JsonWebTokenError);
    
                });
    
                it ('should return TokenExpiredError', () => {
    
                    const token = tokenFactory.getAccessToken();
                    setTimeout(() => {

                        const res = tokenFactory.verifyToken(token);

                        expect(res).not.toBeInstanceOf(NotBeforeError);
                        expect(res).toBeInstanceOf(TokenExpiredError);
                        expect(res).toBeInstanceOf(JsonWebTokenError);
                        
                    }, 60 * 1000);
    
                });

            });

            describe('with RefreshToken' ,() => {

                it ('should return Payload', () => {
                    
                    const token = tokenFactory.getRefreshToken(sampleData);
                    const res = tokenFactory.verifyToken(token);

                    expect(res).not.toBeInstanceOf(NotBeforeError);
                    expect(res).not.toBeInstanceOf(TokenExpiredError);
                    expect(res).not.toBeInstanceOf(JsonWebTokenError);
                    
                });

                it ('should return JsonWebTokenError', () => {

                    const token = jwt.sign(sampleData, 'wrong_key');
                    const res = tokenFactory.verifyToken(token);

                    expect(res).not.toBeInstanceOf(NotBeforeError);
                    expect(res).not.toBeInstanceOf(TokenExpiredError);
                    expect(res).toBeInstanceOf(JsonWebTokenError);

                });

                it ('should return TokenExpiredError', () => {
    
                    const token = tokenFactory.getRefreshToken(sampleData);
                    setTimeout(() => {
                        const res = tokenFactory.verifyToken(token);

                        expect(res).not.toBeInstanceOf(NotBeforeError);
                        expect(res).toBeInstanceOf(TokenExpiredError);
                        expect(res).toBeInstanceOf(JsonWebTokenError);

                    }, 60 * 1000);
    
                });

            });

        });

        describe('this.decode', () => {
            
            describe ('with AccessToken', () => {

                it ('shoulde reutnr Payload', () => {

                    const token = tokenFactory.getAccessToken();
                    const res =  tokenFactory.decodeToken(token);
    
                    expect(res).not.toBeInstanceOf(NotBeforeError);
                    expect(res).not.toBeInstanceOf(TokenExpiredError);
                    expect(res).not.toBeInstanceOf(JsonWebTokenError);
                    
                });
    
                it ('shouldn\'t return JsonWebTokenError', () => {
    
                    const token = jwt.sign({}, 'wrong_key');
                    const res = tokenFactory.decodeToken(token);
    
                    expect(res).not.toBeInstanceOf(NotBeforeError);
                    expect(res).not.toBeInstanceOf(TokenExpiredError);
                    expect(res).not.toBeInstanceOf(JsonWebTokenError);
    
                });
    
                it ('should return TokenExpiredError', () => {
    
                    const token = tokenFactory.getAccessToken();
                    setTimeout(() => {
                        const res = tokenFactory.verifyToken(token);
                        
                        expect(res).not.toBeInstanceOf(NotBeforeError);
                        expect(res).toBeInstanceOf(TokenExpiredError);
                        expect(res).toBeInstanceOf(JsonWebTokenError);
                    }, 60 * 1000);
                    
                });
    
            });

            describe ('with RefreshToken', () => {

                it ('shoulde reutnr Payload', () => {

                    const token = tokenFactory.getRefreshToken(sampleData);
                    const res =  tokenFactory.decodeToken(token);
    
                    expect(res).not.toBeInstanceOf(NotBeforeError);
                    expect(res).not.toBeInstanceOf(TokenExpiredError);
                    expect(res).not.toBeInstanceOf(JsonWebTokenError);
                    
                });
    
                it ('shouldn\'t return JsonWebTokenError', () => {
    
                    const token = jwt.sign(sampleData, 'wrong_key');
                    const res = tokenFactory.decodeToken(token);
    
                    expect(res).not.toBeInstanceOf(NotBeforeError);
                    expect(res).not.toBeInstanceOf(TokenExpiredError);
                    expect(res).not.toBeInstanceOf(JsonWebTokenError);
    
                });
    
                it ('should return TokenExpiredError', () => {
    
                    const token = tokenFactory.getRefreshToken(sampleData);
                    setTimeout(() => {
                        const res = tokenFactory.verifyToken(token);
                        expect(res).not.toBeInstanceOf(NotBeforeError);
                        expect(res).toBeInstanceOf(TokenExpiredError);
                        expect(res).toBeInstanceOf(JsonWebTokenError);
                    }, 60 * 1000);
                    
                });
            });

        });

    });

});