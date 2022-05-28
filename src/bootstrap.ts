import 'reflect-metadata';
import { Pool } from 'pg';
import { Server } from 'http';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

// Constatns to inject as class
import { MODULES } from './constants/modules.symbol';
import { FILTERS } from './constants/filter.symbol';

// Dto
import { IConfig } from './models/interface.loader';

// ioc
import './routes/ioc.loader';

// Factory
import { ConfigFactory, PostgresFactory, LoggerProvider } from './modules/module.loader';

// Server
import { createContainer } from './container';
import { createServer } from './server';

export const MODE = process?.env?.NODE_ENV ?? 'test';

export const runServer = async (MODE: string): Promise<Server | null> => {

    let server: Server | null = null;
    try {

        const conf: IConfig | null = ConfigFactory.initialize(MODE);
        if (conf === null) throw new Error('환경 변수 파일이 정의되지 않았습니다.');
        else console.log('ConfigFactory : 환경 변수 파일이 정의되어 있습니다.');

        const pool: Pool | null = await PostgresFactory.initialize(conf?.PG_POOL);
        if (pool === null) throw new Error('풀 커넥션이 연결되지 않았습니다.');
        else console.log('PostgresFactory : 풀 커넥션이 연결되어 있습니다.');

        const logger = await LoggerProvider.initialize('logs');
        if (logger === null || !logger) throw new Error('로거가 생성되지 않았습니다.');
        else console.log('LoggerProvider : 로거가 설정되었습니다,');

        const container: Container = createContainer(MODULES, FILTERS);
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

runServer(MODE);