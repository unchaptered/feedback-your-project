import { Container } from 'inversify';

// Constatns to inject as class
import { I_MODULES } from './constants/modules.symbol';
import { I_FILTERS } from './constants/filter.symbol';

import { PostgresFactory, ResponseProvider, JoiProvider, LoggerProvider } from './modules/module.loader';
import { HomeService } from './routes/service.loader';
import { HomeRepository } from './routes/repository.loader';

import {  JoinFilter, LoginFilter } from './middlewares/middleware.loader';


export const createContainer = (MODULES: I_MODULES, FILTERS: I_FILTERS): Container => {

    const con = new Container();

    con.bind<JoinFilter>(FILTERS.Join).to(JoinFilter);
    con.bind<LoginFilter>(FILTERS.Login).to(LoginFilter);
    
    con.bind<PostgresFactory>(MODULES.PostgresFactory).to(PostgresFactory);
    
    con.bind<JoiProvider>(MODULES.JoiProvider).to(JoiProvider);
    con.bind<ResponseProvider>(MODULES.ResponseProvider).to(ResponseProvider);
    con.bind<LoggerProvider>(MODULES.LoggerProvider).to(LoggerProvider);

    con.bind<HomeService>(MODULES.HomeService).to(HomeService);
    
    con.bind<HomeRepository>(MODULES.HomeRepository).to(HomeRepository);

    return con;

}