import { inject } from 'inversify';
import { JsonResult } from 'inversify-express-utils/lib/results';
import { controller, httpDelete, httpGet, httpPatch, httpPost, httpPut, requestBody, requestHeaders } from 'inversify-express-utils';

// DI Constants
import { BUILDERS, GUARDS, PATHS, PROVIDERS, SERVICES } from '../../constants/constant.loader';

// Classes (Layer & Modules)
import { BaseController } from '../base/base.controller';
import { SiteService } from '../layer.loader';
import { DtoBuilder, LoggerProvider, ResponseProvider } from '../../modules/module.loader';

// Dtos (Classes & Interfaces)
import { ISite,  ISiteForPost, ISiteForPut, ISiteUrl } from '../../models/interface.loader';
import { CustomException, UnkownServerError } from '../../models/class.loader';



@controller(PATHS.Site)
export class SiteController extends BaseController {

    constructor(
        // Layer
        @inject(SERVICES.SiteService) private siteService: SiteService,
        // Modules
        @inject(BUILDERS.DtoBuilder) private dtoBuilder: DtoBuilder,
        @inject(PROVIDERS.LoggerProvider) private logProvider: LoggerProvider,
        @inject(PROVIDERS.ResponseProvider) private resProvider: ResponseProvider
    ) {
        super();
    }

    /**
     * 
     * @param `ISite`
     * @returns `Promise<JsonResult>`
     */
    @httpPost('/', GUARDS.RefreshTokenGuard)
    public async postSite(
        @requestBody() iSite: ISiteForPost
    ): Promise<JsonResult> {

        try {

            const site = await this.dtoBuilder.getSiteForPost(iSite);

            const result = await this.siteService.postSite(site);

            if (result.rowCount === 0) throw new UnkownServerError('알 수 없는 이유로 등록에 실패하였습니다.');
            else {

                this.logProvider.writeInfo(this.getIp(), `의 사이트 등록에 성공하였습니다. 대상 : ${iSite.url}`);
                return this.json(
                    this.resProvider.getSuccessForm('사이트 등록에 성공하였습니다.', { ...iSite, id: result.rows[0].id }),
                    201);

            }
            
        } catch(err) {

            const result: CustomException = this.errorHandler(err);

            this.logProvider.writeError(this.getIp(), `${result.name} : ${result.message}`);
            return this.json(
                this.resProvider.getFailureForm(`${result.name} : ${result.message}`),
                result.statusCode);
            
        }

    }

    /**
     * 
     * @param `ISiteForPut`
     * @returns `Promise<JsonResult>`
     */
    @httpPut('/', GUARDS.AccessTokenGuard)
    public async putSite(
        @requestBody() {
            url,
            after
        }: { url: string, after: ISiteForPut }
    ): Promise<JsonResult> {

        try {

            const siteUrl = await this.dtoBuilder.getSiteUrl({ url });
            const siteForPut = await this.dtoBuilder.getSiteForPut(after);

            const result = await this.siteService.putSite(siteUrl, siteForPut);

            return this.json(
                this.resProvider.getSuccessForm('사이트 수정에 성공하였습니다.', {}), 201);

        } catch (err) {

            const result: CustomException = this.errorHandler(err);

            this.logProvider.writeInfo(this.getIp(), `${result.name} : ${result.message}`);
            return this.json(
                this.resProvider.getFailureForm(`${result.name} : ${result.message}`),
                result.statusCode);

        }

    }

    /**
     * 
     * @param `ISiteForPatch`
     * @returns `Promise<JsonResult>`
     */
    @httpDelete('/')
    public async disableSite(@requestBody() iSite: ISiteUrl): Promise<JsonResult> {

        try {
            
            const dto = await this.dtoBuilder.getSiteUrl(iSite);
            this.siteService.disableSite(dto);
            
            return this.json('hello', 201);

        } catch(err) {

            const result: CustomException = this.errorHandler(err);

            this.logProvider.writeInfo(this.getIp(), `${result.name} : ${result.message}`);
            return this.json(
                this.resProvider.getFailureForm(`${result.name} : ${result.message}`),
                result.statusCode);

        }
        
    }


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