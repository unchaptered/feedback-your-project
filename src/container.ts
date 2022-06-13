import { Container } from 'inversify';

// Constants
import { I_CLASSES } from './constants/constant.loader';

// Providers
import {
    DevQueryBuilder, SiteQueryBuilder,  DtoBuilder, // Builders
    TokenFactory, ConfigFactory, PostgresFactory,   // Factorries
    LoggerProvider, ResponseProvider,               // Providers
    JoiValidator,                                   // Validators
} from './modules/module.loader';

// Middlewares
import { 
    AccessTokenGuard, RefreshTokenGuard, // Guards
} from './middlewares/middleware.loader';

// Layers
import { AdminService, AuthService, HomeService } from './routes/service.loader';
import { AdminRepository, AuthRepository, HomeRepository } from './routes/repository.loader';



export const createContainer = (CLASSES: I_CLASSES): Container => {

    const con = new Container();

    const {
        MIDDLEWARES: { GUARDS },
        LAYERS: { CONTROLLERS, REPOSITORIES, SERVICES },
        MODULES: { BUILDERS, FACTORIES, PROVIDERS, VALIDATORS }
    } = CLASSES;

    // Guards

    con.bind<AccessTokenGuard>(GUARDS.AccessTokenGuard).to(AccessTokenGuard);
    con.bind<RefreshTokenGuard>(GUARDS.RefreshTokenGuard).to(RefreshTokenGuard);

    // Modules - Factories
    con.bind<TokenFactory>(FACTORIES.TokenFactory).to(TokenFactory);
    con.bind<ConfigFactory>(FACTORIES.ConfigFactory).to(ConfigFactory);
    con.bind<PostgresFactory>(FACTORIES.PostgresFactory).to(PostgresFactory);

    // Modules - Builders
    con.bind<DevQueryBuilder>(BUILDERS.DevQueryBuilder).to(DevQueryBuilder);
    con.bind<SiteQueryBuilder>(BUILDERS.SiteQueryBuilder).to(SiteQueryBuilder);
    con.bind<DtoBuilder>(BUILDERS.DtoBuilder).to(DtoBuilder);

    // Modules - Validators
    con.bind<JoiValidator>(VALIDATORS.JoiValidator).to(JoiValidator);

    // Modules - Providers
    con.bind<LoggerProvider>(PROVIDERS.LoggerProvider).to(LoggerProvider);
    con.bind<ResponseProvider>(PROVIDERS.ResponseProvider).to(ResponseProvider);

    // Layers
    con.bind<HomeService>(SERVICES.HomeService).to(HomeService);
    con.bind<AuthService>(SERVICES.AuthService).to(AuthService);
    con.bind<AdminService>(SERVICES.AdminService).to(AdminService);
    
    con.bind<HomeRepository>(REPOSITORIES.HomeRepository).to(HomeRepository);
    con.bind<AuthRepository>(REPOSITORIES.AuthRepository).to(AuthRepository);
    con.bind<AdminRepository>(REPOSITORIES.AdminRepository).to(AdminRepository);

    return con;

}