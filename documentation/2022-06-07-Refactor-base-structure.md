# Refactor List

1. Constatns
3. Modules
    1. `ADD` BaseModule, BaseValidator
    1. `ADD` DtoBuilder
    2. `ADD` JoiValidator
    3. `DELETE (@deprecated)` JoiProvider
4. Middleware
    1. `DELETE (@deprecated)` IDevForJoinFilterMiddleware
    2. `DELETE (@deprecated)` IDevForLoginFilterMiddleware
    3. `DELETE (@deprecated)` IDevForTokinFilterMiddleware
5. Layers
    1. `ADD` BaseController, BaseLayer
    2. `REFACTOR` All Layer Classes
6. Models
    1. `DELETE (@deprecated)` JoiIDevForJoin
    2. `DELETE (@deprecated)` JoiIDevForLogin
    3. `DELETE (@deprecated)` JoiIDevForToken
    4. `ADD` IDto to force getJoiObject<T>() for dto classes seems like [ Dev, DevForLogin, ... ]
    5. `REFACTOR` Dev implements IDto
    6. `REFACTOR` DevFoJoin implements IDto
    7. `REFACTOR` DevForLogin implements IDto
    6. `REFACTOR` DevForToken implements IDto
7. Test following changes...

<hr>

## Why did I proceed with this REFACTOR?

1. About Dto
2. About Exception
3. About Constants
4. About BaseClass
5. About ErrorHandler

<hr>

### About Dto

Before this REFACOTRING, I use some Interfaces as Dto, Data Transfer Object.

This way is oftenly used Pattern in Frontend....

And so, I want to use class as Dto, I encounter these problems.

1. Before, I use Filter Middleware, using `@inject() JoiProvider, ResponseProvider`;
2. Before, I call ResponseProvider in `Service only`, not Controller.
    Controller Recieve `Promise<[IForm, number]>`.

So, I fix logics....

1. After, I delete FIlter Middleware
2. After, I fix Service would return `Promise<QueryResult>`.
3. After, I fix Controller, using `@inject() JoiProvider, ResponseProvider`.


#### Refactor Process...

> This is Refactoring Process..

But, My JoiProvider ins't Scalability.

```typescript
@provide(PROVIDERS.JoiProviders)
export class JoiProvider {

    constructor(
        @inject(JOI.IdevForJoin) private iDevForJoin: JoiIDevForJoin,
        @inject(JOI.IDevForLogin) private iDevForLogin: JoiIDevForLogin,
        @inject(JOI.IDevForToken) private iDevForToken: JoiIDevForToken
        // If I add dto, Provider has Unnecessary Properties...
    ) {}

    public async validateIDevForJoin(d: IDevForJoin): Promise<IDevForJoin | Error> {}
    public async validateIDevForLogin(d: IDevForLogin): Promise<IDevForLogin | Error> {}
    public async validateIDevForToken(d: IDevForToken): Promise<IDevForToken | Error> {}
    // If I add dto, Provider contain new methods... fck...
}
```

So, I change JoiProvider to JoiValidator

```typescript
@provide(VALIDATOR.JoiValidator)
export class JoiValidator {
    
    constructor() {}

    public async validate<T>(d: T, joi: Joi.ObjectSchema<T>): Promise<T> {

        try {

            return await joi.validateAsync({ ...data });

        } catch(err) {

            throw thise.errorHandler(err);

        }

    }

}
```

But, In Typescript, Generic Constructor is not usable.

So, I need to more Module such as Builder.

```typescript
@provide(BUILDERS.DtoBduiler)
export class DtoBuilder {

    constructor(
        @inject(VALIDATORS.JoiValidator) private joi: JoiValidator
    ) {}

    getDev(data: IDev): Promise<Dev> {

        try {

            return new Dev(
                await this.joi.validate<IDev>(data, Dev.joiObject));
            
        } catch (err) {
            
            throw this.errorHandler(err);

        }

    }

    // other dtos...

}
```



<hr>

### About Exception

Before this REFACOTRING, All Exception Class directly implments ICustomExcptions.

This way provide to differentiate this...

1. Unexpected Error such as 5xx...
2. Expected Error such as 4xx..

At the same time, it lost its identity as Same Class about Error.

So, I refactor this....

1. create new CustomException classs between ICustomException and All Exception

```typescript
class CustomException implements ICustomException {}
class BadRequestExcpetion extends CustomException {}
```

Finally ...
```typescript
const error = new BadRequestException();

console.log(error instanceof Error) // false
console.log(error instanceof CustomException) // true
console.log(error instanceof BadRequestExcpetion) // true
```

<hr>

### About Constants

Before this REFACTORING, I have many files for constants.

As I add modules while REFACTORING, this file isn't instuitive.

So, I refactor codes...

1. combine all interfaces while grouping
2. create one constants instance

According this change, when I call Constants Symbol, I feels new Inconvenience.

```typescript
import { CLASSES } from 'models/constants.lodaer';

@provide(CLASSES.LAYERS.SERVICES.AuthService)
export class AuthService{

    constructor(
        // Layers
        @inject(CLASSES.MODULES.REPOSITORIES.AuthRepository) private authRepository: AuthRepository,
        // Modules
        @inject(CLASSES.MODULES.FACTORIES.TokenFactory) private tokenFactory: TokenFactory,
        @inject(CLASSES.MODULES.PROVIDERS.ResponseProvider) private resProvider: ResponseProvider
    ) {}
}
```

So, I add some Variables References On Single Constants

```typescript
import { CLASSES } from './classes/class.constants';
import { /* I_GUARDS ... etc */ } from './classes/i.class.constants';

const GUARDS: I_GUARDS = CLASSES.MIDDLEWARES.GUARDS;

const BUILDERS: I_BUILDERS = CLASSES.MODULES.BUILDERS;
const FACTORIES: I_FACTORIES = CLASSES.MODULES.FACTORIES;
const PROVIDERS: I_PROVIDERS = CLASSES.MODULES.PROVIDERS;
const VALIDATORS: I_VALIDATORS = CLASSES.MODULES.VALIDATORS;

const CONTROLLERS: I_CONTROLLERS = CLASSES.LAYERS.CONTROLLERS;
const REPOSITORIES: I_REPOSITORIES = CLASSES.LAYERS.REPOSITORIES;
const SERVICES: I_SERVICES = CLASSES.LAYERS.SERVICES;

export {

    GUARDS,

    BUILDERS,
    FACTORIES,
    PROVIDERS,
    VALIDATORS,

    CONTROLLERS,
    REPOSITORIES,
    SERVICES,
};
```

And I can use Symbol more Simple.

```typescript
import { SERVICES, REPOSITORIES, FACTORIES, PROVIDERS } from 'models/constants.lodaer';

@provide(SERVICES.AuthService)
export class AuthService{

    constructor(
        // Layers
        @inject(REPOSITORIES.AuthRepository) private authRepository: AuthRepository,
        // Modules
        @inject(FACTORIES.TokenFactory) private tokenFactory: TokenFactory,
        @inject(PROVIDERS.ResponseProvider) private resProvider: ResponseProvider
    ) {}
}
```

<hr>

### About BaseClass

Sometimes, I need to smae errorHandler, or mores...

So, I craete some BaseClasses

1. BaseModule
2. BaseLayer
3. BaseController
4. BaseLayer

This, BaseClass contain Some `@protected` methods.

Sucha as, errorHandler(`watch About ErrorHandler`).

<hr>

### About ErrorHandler

When I use `async-await`, I can't perfectly expect about Error.

So, I seperated 3 cases...

1. expected case : call Expected Exception Class
2. unexpected case + instanceof Error : call Interval Server Error
3. unexpected case + not isntanceof Error : call Unkown Server Error

And then, Typically, I have 2 kind of logics.

```typescript
// Unexcpected Error
if (err instanceof CustomException) return err;
else if (err instanceof Error) return new IntervalServerError(err.message);
else return new UnkownServerError(JSON.stringify(err));

// Expected Error, such as BadRequestException
if (err instanceof CustomException) return err;
else if (err instanceof Error) return new BadRequestException(err.message);
else return new UnkownServerError(JSON.stringify(err));
```

I want to hide this ugly codes...

SO I extact this logics rigth these...

```typescript
export const errorHandler = (err: unkown): CustomException => {

    if (err instanceof CustomException) return err;
    else if (err instanceof Error) return new IntervalServerError(err.message);
    else return new UnkownServerError(JSON.stringify(err));

}
export const errorParamsHandler = (err: unkown): CustomException => {

    if (err instanceof CustomException) return err;
    else if (err instanceof Error) return new BadRequestException(err.message);
    else return new UnkownServerError(JSON.stringify(err));

}
```

And, If I don\'t want to repeat `if-else` -> `if-else`, return change throw.

Only, Controller really catch.