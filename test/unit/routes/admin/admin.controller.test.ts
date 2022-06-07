import 'reflect-metadata';
import { BaseHttpController } from 'inversify-express-utils';

// Testing Module
import { BaseController } from '../../../../src/routes/base/base.controller';
import { AdminController }  from '../../../../src/routes/controller.loader';

describe ('Admin Controller', () => {

    let adminController: AdminController;

    beforeEach(() => {
        adminController = new AdminController();
    });
    
    it ('has 8 func', () => {
        
        expect(Object.keys(adminController).length).toBe(1);

        expect(adminController.getAdminByOptions).toBeDefined();
        expect(adminController.postAdminData).toBeDefined();
        expect(adminController.putAdminData).toBeDefined();
        expect(adminController.patchAdminData).toBeDefined();
        expect(adminController.getFeedbackByIdAndOptions).toBeDefined();
        expect(adminController.postFeedbackForm).toBeDefined();
        expect(adminController.putFeedbackForm).toBeDefined();
        expect(adminController.patchFeedbackForm).toBeDefined();

    });

    it ('extends BaseController, BaseHttpController', () => {

        expect(adminController).toBeInstanceOf(BaseController);
        expect(adminController).toBeInstanceOf(BaseHttpController);

    });
    
});