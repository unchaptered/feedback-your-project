import { controller, httpGet, httpPatch, httpPost, httpPut } from 'inversify-express-utils';

// DI Constants
import { PATHS } from '../../constants/constant.loader';

// Classes (Layer & Modules)
import { BaseController } from '../base/base.controller';


@controller(PATHS.Admin)
export class AdminController extends BaseController {

    constructor() {
        super();
    }

    // 등록된 관리자 확인
    @httpGet('')
    public getAdminByOptions() {}

    // 관리자 등록
    @httpPost('/')
    public postAdminData() {}

    // 관리자 정보 수정
    @httpPut('/')
    public putAdminData() {}

    // 관리자 탈퇴 (실제로는 비활성화)
    @httpPatch('/')
    public patchAdminData() {}


    // 관리자가 받은 모든 피드백 출력
    @httpGet('/feedback')
    public getFeedbackByIdAndOptions() {}

    // (피드백 양식이 없을 시) 새로운 피드백 양식 등록
    @httpPost('/feedback')
    public postFeedbackForm() {}

    // (피드백 양식이 있을 시) && (등록된 리뷰가 없을 시) 기존의 피드백 양식 수정
    @httpPut('/feedback')
    public putFeedbackForm() {}

    // 피드백 전체 삭제 (실제로는 비활성화)
    @httpPatch('/feedback')
    public patchFeedbackForm() {}

}