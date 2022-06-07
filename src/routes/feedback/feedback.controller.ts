import { controller, httpGet, httpPost } from 'inversify-express-utils';

// DI Constatns
import { PATHS } from '../../constants/constant.loader';

// Classes (Layer & Modules)
import { BaseController } from '../base/base.controller';


@controller(PATHS.Feedback)
export class FeedbackController extends BaseController {

    constructor() {
        super();
    }
    
    @httpGet('/:id')
    public getFeedbackBySiteId() {}

    @httpPost('/:id')
    public postFeedbackBySiteId() {}
    
}