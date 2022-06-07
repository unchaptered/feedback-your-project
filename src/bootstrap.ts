import 'reflect-metadata';
import { Pool } from 'pg';
import { Server } from 'http';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

// Constatns to inject as class
import { CLASSES } from './constants/constant.loader';

// Dto
import { IConfig, ITokenConfig } from './models/interface.loader';

// ioc
import './routes/ioc.loader';

// Factory
import { ConfigFactory, PostgresFactory, LoggerProvider, TokenFactory } from './modules/module.loader';

// Server
import { createContainer } from './container';
import { createServer } from './server';
import winston from 'winston';


export const MODE = process?.env?.NODE_ENV ?? 'test';


export const runServer = async (MODE: string): Promise<Server | null> => {

    let server: Server | null = null;
    try {

        const conf: IConfig = await ConfigFactory.initialize(MODE);

        const pool: Pool = await PostgresFactory.initialize(conf?.POOL_CONF);
        const token: ITokenConfig = await TokenFactory.initialize(conf?.TOKEN_CONF);
        const logger: winston.Logger = LoggerProvider.initialize(conf?.LOG_CONF?.DIR);

        const container: Container = createContainer(CLASSES);
        const serverContainer: InversifyExpressServer = createServer(container);

        server = serverContainer.build().listen(conf?.PORT, () => {
            if (MODE !== 'test') console.log(`Server is running on ${conf?.PORT}`);
        });

    } catch (err) {

        console.log(err);

    } finally {

        return server;

    }

};

export const server = runServer(MODE);