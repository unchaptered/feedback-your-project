import { DotenvConfigOptions, DotenvConfigOutput } from 'dotenv';
import { provide } from 'inversify-binding-decorators';

// di
import { MODULES } from '../../constants/constant.loader';

// dtos
import { IConfig } from '../../models/interface.loader';

// private
import * as ConfigPrivate from './private/config.private';

@provide(MODULES.ConfigFactory)
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