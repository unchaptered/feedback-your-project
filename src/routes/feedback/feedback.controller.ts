import { controller, httpGet, httpPost } from 'inversify-express-utils';

// di
import { PATHS } from '../../constants/paths.enum';

@controller(PATHS.Feedback)
export class FeedbackController {

    constructor() {}
    
    @httpGet('/:id')
    public getFeedbackBySiteId() {}

    @httpPost('/:id')
    public postFeedbackBySiteId() {}
}