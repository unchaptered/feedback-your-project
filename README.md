# feedback your project

When you want to feedback of your project.

Basically, you can use many `Form Service`, such as Google Form.

But, user's view, It's not good to press a other URL to feedback yours.

**SO**, I want to Open Feedback API Service.

**What if** your feedback using axios in the following way?

```javascript
import axios from 'axios';

const BASE_URL = 'feedback-your.site.com';

const getMyFeedback = () => {
  
  axios.get(BASE_URL + '/feedback')
    .then(response => console.log(response))
    .catch(err => console.log(err));
  
};

const postMyFeedback = () => {
  
  axios.post(BASE_URL = '/feedback')
    .then(response => console.log(response))
    .catch(err => console.log(err));

};
```


## Log

This project is started `2022-05-28` using express, inversify.

## Dependencies

- Dependencies is used for build server
- DevDependencies is used for develope, test for stability.

### Dependencies

| num | name | purpose |
| :-- | :--- | :-------- |
|  1  | dotenv | use environment files |
|  2  | joi | provide stable validators |
|  3  | express | provide http servers framework |
|  4  | jsonwebotken | provide stable authorization token |
|  5  | inversify <br> inversify-express-utils <br> inversify-binding-decorators | provide DI / IOC <br> combine router and controller <br> extra utils |
|  6  | winstone <br> winston-daily-rotate-file | provide logger <br> provide daily loggers |
|  7  | reflect-metadata | provide @decorators |

### DevDependencies

| num | name | purpose |
| :-- | :--- | :-------- |
|  1  | @types/ | synchronize modules to typescript |
|  2  | @jest/ | synchrozie jest to typescript |
|  3  | cross-env | use envrioment values (NODE_ENV) |
|  4  | faker | use fake data generators |
|  5  | jest <br> supertest <br> node-mocks-http | test system |
|  6  | typescript <br> tsc <br> tsc-watch <br> ts-jest <br> ts-node | typescript dependencies |

## Settings

- Jest Configuration Options
- Typescript Configuration Options

### Jest Configuration Options

```json
"jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": ".",
    "testRegex": ".*\\.test\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "testEnvironment": "node",
    "coverageDirectory": "./coverage",
    "coveragePathIgnorePatterns": [
      "dist/",
      "backup/",
      "test/mock/",
      "backup_integration/",
      "coverage/lcov-report"
    ],
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ]
}
```

### Typescript Configuration Options

```json
{
  "compilerOptions": {
    "strict": true,
    "charset": "utf8",
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "downlevelIteration": true,
    "target": "ES5",
    "outDir": "./dist",
    "baseUrl": "./src",
    "incremental": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}

```