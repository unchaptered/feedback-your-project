export interface I_CLASSES {
    MIDDLEWARES: I_MIDDLEWARES;
    MODULES: I_MODULES;
    LAYERS: I_LAYERS;
};

    export interface I_MIDDLEWARES {
        GUARDS: I_GUARDS,
        FILTERS: I_FILTERS
    };
        export interface I_GUARDS {
            AccessTokenGuard: symbol,
            RefreshTokenGuard: symbol
        };
        export interface I_FILTERS {
            TokenRepublisherFilter: symbol
        }
    export interface I_MODULES {
        FACTORIES: I_FACTORIES,
        BUILDERS: I_BUILDERS,
        VALIDATORS: I_VALIDATORS,
        PROVIDERS: I_PROVIDERS
    };
        export interface I_FACTORIES {
            TokenFactory: symbol,
            ConfigFactory: symbol,
            PostgresFactory: symbol
        };
        export interface I_BUILDERS {
            DevQueryBuilder: symbol,
            SiteQueryBuilder: symbol,
            DtoBuilder: symbol
        };
        export interface I_VALIDATORS {
            JoiValidator: symbol
        };
        export interface I_PROVIDERS {
            LoggerProvider: symbol,
            ResponseProvider: symbol
        };

    export interface I_LAYERS {
        CONTROLLERS: I_CONTROLLERS,
        SERVICES: I_SERVICES,
        REPOSITORIES: I_REPOSITORIES
    };
        export interface I_CONTROLLERS {
            HomeController: symbol,
            AuthController: symbol,
            SiteController: symbol,
            FeedbackController: symbol,
        }
        export interface I_SERVICES {
            HomeService: symbol,
            AuthService: symbol
            SiteService: symbol,
        };
        export interface I_REPOSITORIES {
            HomeRepository: symbol,
            AuthRepository: symbol,
            SiteRepository: symbol,
        };