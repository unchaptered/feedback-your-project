import { controller, httpGet, httpPost } from 'inversify-express-utils';

// Di
import { PATHS } from '../../constants/constant.loader';


@controller(PATHS.Feedback)
export class FeedbackController {

    constructor() {}
    
    @httpGet('/:id')
    public getFeedbackBySiteId() {}

    @httpPost('/:id')
    public postFeedbackBySiteId() {}
    
}