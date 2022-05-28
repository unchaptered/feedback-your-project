import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import * as express from 'express';
// import { setJson, setUrlencoded } from './base/base.middleware';

export const createServer = (container: Container): InversifyExpressServer => {

    const app = new InversifyExpressServer(container);

    app.setConfig((app) => {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    });
    
    return app;

};