import { I_CLASSES } from './i.classes.constants';

export const CLASSES: I_CLASSES = {
    LAYERS: {
        CONTROLLERS: {
            HomeController: Symbol.for('HomeController'),
            AuthController: Symbol.for('AuthController'),
            SiteController: Symbol.for('SiteController'),
            FeedbackController: Symbol.for('FeedbackController')
        },
        REPOSITORIES: {
            SiteRepository: Symbol.for('SiteRepository'),
            AuthRepository: Symbol.for('AuthRepository'),
            HomeRepository: Symbol.for('HomeRepository')
        },
        SERVICES: {
            SiteService: Symbol.for('SiteService'),
            AuthService: Symbol.for('AuthService'),
            HomeService: Symbol.for('HomeService')
        }
    },
    MIDDLEWARES: {
        GUARDS: {
            AccessTokenGuard: Symbol.for('AccessTokenGuard'),
            RefreshTokenGuard: Symbol.for('RefreshTokenGuard')
        },
        FILTERS: {
            TokenRepublisherFilter: Symbol.for('TokenRepublisherFilter')
        }
    },
    MODULES: {
        FACTORIES: {
            ConfigFactory: Symbol.for('ConfigFactory'),
            PostgresFactory: Symbol.for('PostgresFactory'),
            TokenFactory: Symbol.for('TokenFactory')
        },
        BUILDERS: {
            DevQueryBuilder: Symbol.for('DevQueryBuilder'),
            SiteQueryBuilder: Symbol.for('SiteQueryBuilder'),
            DtoBuilder: Symbol.for('DtoBuilder')
        },
        PROVIDERS: {
            LoggerProvider: Symbol.for('LoggerProvider'),
            ResponseProvider: Symbol.for('ResponseProvider'),
        },
        VALIDATORS: {
            JoiValidator: Symbol.for('JoiValidator')
        }
    }
};