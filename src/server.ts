import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import { json, urlencoded } from 'express';


export const createServer = (container: Container): InversifyExpressServer => {

    const app = new InversifyExpressServer(container);

    app.setConfig((app) => {
        app.use(json());
        app.use(urlencoded({ extended: true }));
    });
    
    return app;

};