import { DotenvConfigOptions, DotenvConfigOutput } from 'dotenv';

// dtos
import { IConfig } from '../../models/interface.loader';

// private
import * as ConfigPrivate from './private/config.private';


export class ConfigFactory {
    
    static config: IConfig | null = null;

    static initialize(MODE: string): IConfig | null {

        if (ConfigFactory.config) return ConfigFactory.config;

        const option: DotenvConfigOptions = ConfigPrivate.getOptionInstance(MODE);
        const path: DotenvConfigOutput = ConfigPrivate.setConfigPathByOption(option);

        const config: IConfig = ConfigPrivate.getConfigInstance();

        const isValid = ConfigPrivate.isValidOfConfig(config);
        if (isValid) ConfigFactory.config = config;
        
        return ConfigFactory.config;

    }

};