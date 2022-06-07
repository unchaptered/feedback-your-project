import { PoolClient } from 'pg';
import { CustomException } from '../../../models/class.loader';

/**
 * Blueprint of DevQueryBuilder
 * 
 * Must Realize `1 public functions`
 */
export interface IPostgresFactory {

    getClient(): Promise<PoolClient | CustomException>
    
}