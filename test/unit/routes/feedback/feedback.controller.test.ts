import 'reflect-metadata';
import { BaseHttpController } from 'inversify-express-utils';

// Testing Module
import { BaseController } from '../../../../src/routes/base/base.controller';
import { FeedbackController }  from '../../../../src/routes/layer.loader';


describe ('Feedback Controller', () => {

    let feedbackController: FeedbackController;

    beforeEach(() => {
        feedbackController = new FeedbackController();
    });
    
    it ('has 2 func', () => {
        
        expect(Object.keys(feedbackController).length).toBe(1);

        
        expect(feedbackController.getFeedbackBySiteId).toBeDefined();
        expect(feedbackController.postFeedbackBySiteId).toBeDefined();

    });

    it ('extends BaseController, BaseHttpController', () => {

        expect(feedbackController).toBeInstanceOf(BaseController);
        expect(feedbackController).toBeInstanceOf(BaseHttpController);

    });
    
});