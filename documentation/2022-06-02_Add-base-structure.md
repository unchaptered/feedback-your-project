# Add List

0. constants
1. routes | seperated layer classes for basic API Server.
2. modules | extracted classes to provide functions in routes, middlewares.
3. middlewares | extracted classes from layer to reduce repeated logics.
4. models | provide stability into Config, Service, Iterator
5. loaders | provide stability to Refactor, Move files.

## Constants

> Symbol.for is literraly Unique Symbol! <br>
> [What is Symbol.for? - oFficial docs](https://www.typescriptlang.org/docs/handbook/symbols.html#unique-symbol)

| sort    |  name        | description |
| :------ | :---------- | :---------- |
| routes  | paths       | enum PATHS  |
| modules | modules     | Symbol.for('name of modules') |
| modules | filters     | Symbol.for('name of filters') |
| modules | guards      | Symbol.for('name of guards') |
| modules | joi         | Symbol.for('name of joi objects') |

<hr>

## Routes

> Routes is litteraly routes

| name        | description | dependencies |
| :---------- | :---------- | :------------ |
| Middlewares | extends BaseMiddlewares | JoiProvider, LoggerProvider, ResponseProvider, TokenFactory(Optional) |
| Controllers | 1. Call Service <br> 2. Response to Request <br> 3. Logging | RoutesService, LoggerProvider |
| Services    | 1. Call Repository <br> 2. Package data of Repository | RoutesRepository, ResponseRepotiory, TokenFactory(Optional) |
| Repository  | 1. Connect Database | DevQueryBuilder, PostgresFactory |

<hr>

## Modules

> Modules is proivder classes to some functions.

| name              | description             | properties | dependenceis |
| :---------------- | :---------------------- | :--------- | :----------- |
| LoggerProviders   | provide winston.logger  | `static` initialize | npm : winston + 1 |
| ResponseProviders | provide stable form     | getSuccessForm + 1  | custom : SuccessForm, FailureForm |
| ConfigFactory     | provide Envrionment val | `static` initialize | npm : dotenv, <br> custom : Config, ConfigPrivate |
| PostgresFactory   | proivde Pool, Client    | `static` initialize | npm : pg <br> custom : PostgresPrivate |
| TokenFactory      | provide Token System    | `static` initialize | npm : jsonwebtoken |
| QueryBuilder      | provide QueryString     | (too many) |  - |

<hr>

## Middlewares

> Middleware will maintain business logic is clean.

| name    | description | dependencies |
| :------ | :---------- | :------------ |
| Filters | Filter invalid parameters before connecting controllers | custom : some of Modules
| Guards  | Guard unathorized client before connecting controllers  | custom : some of Modules|

<hr>

## Models

> Basically DTO is interfaces. <br>
> Filter + JoiProvider should say 'this params is safe to use!'. <br>
> Some value, such as Config, need more validation check before call constructor. <br>
> In this case, I use classes or enum.

| name       | description                                   |
| :--------- | :-------------------------------------------- |
| classes    | basically usecase to provide stability of DTO |
| interfaces | basically usecase is DTO                      |

<hr>

## Loaders

All seperated modules must throw *.loaders.ts.

```typescript
import { LoggerProvider } from './providers/logger.provider';
import { ResponseProvider } from './proivders/response.providers';


export {
    LoggerProviders,
    ResponseProviders
};
```

Sometimes I use ioc.loaders right this.

```typescript
// this is ioc files, inversify auto connect.
import './home.controller';
import './auth.controller';
```