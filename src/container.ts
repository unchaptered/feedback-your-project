import { Container } from 'inversify';

// Constants
import { I_MODULES, I_FILTERS, I_GUARDS, I_JOY } from './constants/constant.loader';

// Providers
import {
    TokenFactory, ConfigFactory, PostgresFactory,// Factorries
    DevQueryBuilder, // Builders
    LoggerProvider, ResponseProvider, JoiProvider, // Providers
} from './modules/module.loader';

// Validators
import {
    JoiIDevForJoin, JoiIDevForLogin, JoiIDevForToken // Validators
} from './models/class.loader';

// Middlewares
import { 
    AccessTokenGuard, RefreshTokenGuard, // Guards
    IDevForJoinFilter, IDevForLoginFilter, IDevForTokenFilter // Filters
} from './middlewares/middleware.loader';

// Layers
import { AuthService, HomeService } from './routes/service.loader';
import { AuthRepository, HomeRepository } from './routes/repository.loader';



export const createContainer = (MODULES: I_MODULES, FILTERS: I_FILTERS, GUARDS: I_GUARDS, JOYS: I_JOY): Container => {

    const con = new Container();

    // Guards

    con.bind<AccessTokenGuard>(GUARDS.accessToken).to(AccessTokenGuard);
    con.bind<RefreshTokenGuard>(GUARDS.refreshToken).to(RefreshTokenGuard);

    // Modules

    con.bind<TokenFactory>(MODULES.TokenFactory).to(TokenFactory);
    con.bind<ConfigFactory>(MODULES.ConfigFactory).to(ConfigFactory);
    con.bind<PostgresFactory>(MODULES.PostgresFactory).to(PostgresFactory);

    con.bind<DevQueryBuilder>(MODULES.DevQueryBuilder).to(DevQueryBuilder);
    
    con.bind<JoiProvider>(MODULES.JoiProvider).to(JoiProvider);
    con.bind<LoggerProvider>(MODULES.LoggerProvider).to(LoggerProvider);
    con.bind<ResponseProvider>(MODULES.ResponseProvider).to(ResponseProvider);

    // Filters
    con.bind<IDevForJoinFilter>(FILTERS.IDevForJoin).to(IDevForJoinFilter);
    con.bind<IDevForLoginFilter>(FILTERS.IDevForLogin).to(IDevForLoginFilter);
    con.bind<IDevForTokenFilter>(FILTERS.IDevForToken).to(IDevForTokenFilter);

    // Jois
    con.bind<JoiIDevForJoin>(JOYS.iDevForJoin).to(JoiIDevForJoin);
    con.bind<JoiIDevForLogin>(JOYS.iDevForLogin).to(JoiIDevForLogin);
    con.bind<JoiIDevForToken>(JOYS.iDevForToken).to(JoiIDevForToken);

    // Layer
    con.bind<HomeService>(MODULES.HomeService).to(HomeService);
    con.bind<AuthService>(MODULES.AuthService).to(AuthService);
    
    con.bind<HomeRepository>(MODULES.HomeRepository).to(HomeRepository);
    con.bind<AuthRepository>(MODULES.AuthRepository).to(AuthRepository);

    return con;

}