import { Container } from 'inversify';

// DI Constants
import { I_CLASSES } from './constants/constant.loader';

// Layers
import {
    AuthService, HomeService, SiteService,          // Services
    AuthRepository, HomeRepository, SiteRepository  // Repositories
} from './routes/layer.loader';

// Middlewares
import { 
    AccessTokenGuard, RefreshTokenGuard,            // Guards
    TokenRepublisherFilter                          // Filter
} from './middlewares/middleware.loader';

// Modules
import {
    DevQueryBuilder, SiteQueryBuilder,  DtoBuilder, // Builders
    TokenFactory, ConfigFactory, PostgresFactory,   // Factorries
    LoggerProvider, ResponseProvider,               // Providers
    JoiValidator,                                   // Validators
} from './modules/module.loader';



export const createContainer = (CLASSES: I_CLASSES): Container => {

    const con = new Container();

    const {
        MIDDLEWARES: { GUARDS, FILTERS },
        LAYERS: { CONTROLLERS, REPOSITORIES, SERVICES },
        MODULES: { BUILDERS, FACTORIES, PROVIDERS, VALIDATORS }
    } = CLASSES;

    con.bind<AccessTokenGuard>(GUARDS.AccessTokenGuard).to(AccessTokenGuard);
    con.bind<RefreshTokenGuard>(GUARDS.RefreshTokenGuard).to(RefreshTokenGuard);

    con.bind<TokenRepublisherFilter>(FILTERS.TokenRepublisherFilter).to(TokenRepublisherFilter);

    // Layers
    con.bind<HomeService>(SERVICES.HomeService).to(HomeService);
    con.bind<AuthService>(SERVICES.AuthService).to(AuthService);
    con.bind<SiteService>(SERVICES.SiteService).to(SiteService);
    
    con.bind<HomeRepository>(REPOSITORIES.HomeRepository).to(HomeRepository);
    con.bind<AuthRepository>(REPOSITORIES.AuthRepository).to(AuthRepository);
    con.bind<SiteRepository>(REPOSITORIES.SiteRepository).to(SiteRepository);

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



    return con;

}