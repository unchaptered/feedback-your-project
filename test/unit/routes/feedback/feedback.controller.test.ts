import 'reflect-metadata';
import { FeedbackController }  from '../../../../src/routes/controller.loader';

describe ('Feedback Controller', () => {

    let feedbackController: FeedbackController;

    beforeEach(() => {
        feedbackController = new FeedbackController();
    });
    
    it ('has 2 func', () => {
        
        expect(Object.keys(feedbackController).length).toBe(0);

        
        expect(feedbackController.getFeedbackBySiteId).toBeDefined();
        expect(feedbackController.postFeedbackBySiteId).toBeDefined();

    });
    
});