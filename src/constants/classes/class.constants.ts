import { I_CLASSES } from './i.classes.constants';

export const CLASSES: I_CLASSES = {
    LAYERS: {
        CONTROLLERS: {
            HomeController: Symbol.for('HomeController'),
            AuthController: Symbol.for('AuthController'),
            AdminController: Symbol.for('AdminController'),
            FeedbackController: Symbol.for('FeedbackController')
        },
        REPOSITORIES: {
            AdminRepository: Symbol.for('AdminRepository'),
            AuthRepository: Symbol.for('AuthRepository'),
            HomeRepository: Symbol.for('HomeRepository')
        },
        SERVICES: {
            AdminService: Symbol.for('AdminService'),
            AuthService: Symbol.for('AuthService'),
            HomeService: Symbol.for('HomeService')
        }
    },
    MIDDLEWARES: {
        GUARDS: {
            AccessTokenGuard: Symbol.for('AccessTokenGuard'),
            RefreshTokenGuard: Symbol.for('RefreshTokenGuard')
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