import { DotenvConfigOptions, DotenvConfigOutput } from 'dotenv';
import { provide } from 'inversify-binding-decorators';

// DI Constants
import { FACTORIES } from '../../constants/constant.loader';
import * as ConfigPrivate from './private/config.private';

// Dto (Interfaces)
import { IConfig } from '../../models/interface.loader';


@provide(FACTORIES.ConfigFactory)
export class ConfigFactory {
    
    static config: IConfig;

    static async initialize(MODE: string): Promise<IConfig> {

        if (ConfigFactory.config) return ConfigFactory.config;

        const option: DotenvConfigOptions = ConfigPrivate.getOptionInstance(MODE);
        const path: DotenvConfigOutput = ConfigPrivate.setConfigPathByOption(option);

        const config: IConfig = await ConfigPrivate.getConfigInstance();

        ConfigFactory.config = config;

        return ConfigFactory.config;

    }

};