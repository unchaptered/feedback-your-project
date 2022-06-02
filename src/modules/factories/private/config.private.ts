import { config, DotenvConfigOptions, DotenvConfigOutput } from 'dotenv';

// configs
import { Config } from '../../../models/class.loader';

// dtos
import { IConfig } from '../../../models/interface.loader';


export const getOptionInstance = (MODE: string): DotenvConfigOptions => {

    const option: DotenvConfigOptions = {
        path: MODE ==='dev' ? '.env.dev' :
            MODE === 'test' ? '.env.test' : '.env.prod'
    };

    return option;
}
export const setConfigPathByOption = (option: DotenvConfigOptions): DotenvConfigOutput => {
    return config(option);
}
export const getConfigInstance = async (): Promise<Config> => {
    return await new Config();
}

// /**
//  * @deprecated
//  */
// export const isValidOfConfig = (config: IConfig): boolean => {
    
//     for (const conf of config) {
//         if (conf instanceof Object) {
            
//             for (const c of conf)
//                 if (!c) return false;

//         } else {

//             if (!conf) return false;

//         }
//     }

//     return true;
// }