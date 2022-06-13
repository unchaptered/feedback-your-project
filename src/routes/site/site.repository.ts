import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

// DI Constants
import { BUILDERS, FACTORIES, REPOSITORIES } from '../../constants/constant.loader';

// Classes (Layer & Modules)
import { BaseLayer } from '../base/base.layer';
import { DtoBuilder, PostgresFactory, SiteQueryBuilder } from '../../modules/module.loader';

// Dtos (Classes)
import { QueryResult } from 'pg';
import {
    CustomException, NotFoundException, UnauthorizedException,
    SiteForPost, SiteForPut, SiteUrl, IntervalServerError, ConflictException, BadRequestException } from '../../models/class.loader';


@provide(REPOSITORIES.SiteRepository)
export class SiteRepository extends BaseLayer {

    constructor(
        // Modules
        @inject(BUILDERS.SiteQueryBuilder) private siteQuery: SiteQueryBuilder,
        @inject(FACTORIES.PostgresFactory) private pgFactory: PostgresFactory,
        @inject(BUILDERS.DtoBuilder) private dtoBuilder: DtoBuilder
    ) {
        super();
    }
    
    public async postSite(iSite: SiteForPost): Promise<QueryResult> {

        const client = await this.pgFactory.getClient();
        if (client instanceof CustomException) throw client;

        
        try {
            
            client.query('BEGIN;');
            
            const findSiteQuery = this.siteQuery.isExistsSiteByUrl(iSite.url);
            

            const checkResult = await client.query(findSiteQuery);
            if (checkResult.rowCount !== 0) throw new ConflictException('이미 사용 중인 URL 입니다.');

            const res = await client.query(
                this.siteQuery.postSite(iSite));

            const findResult = await client.query(findSiteQuery);
            if (findResult.rowCount === 0) throw new NotFoundException('URL 등록에 실패하였습니다.');
            

            if (iSite?.description) {

                const siteId = findResult.rows[0].id;
                const findSiteDescriptionQuery = this.siteQuery.isExistsSiteDescriptionBySiteId(siteId);

                // don't allow `is exists? === true` before run `postSIteDescripQuery`;
                if ((await client.query(findSiteDescriptionQuery)).rowCount !== 0)
                    throw new ConflictException('이미 사용 중인 URL 입니다.');

                await client.query(
                    this.siteQuery.postSiteDescription(siteId, iSite.description));
                    
                if ((await client.query(findSiteDescriptionQuery)).rowCount === 0)
                    throw new NotFoundException('URL 등록에 실패하였습니다.');

                client.query('COMMIT;');
                client.release();

                return findResult;

            } else {

                client.query('COMMIT;');
                client.release();

                return findResult;

            }

        } catch(err) {

            client.query('ROLLBACK;');
            client.release();

            throw this.errorHandler(err);

        }

    }

    public async putSite(siteUrl: SiteUrl, siteForPut: SiteForPut): Promise<QueryResult> {

        const client = await this.pgFactory.getClient();
        if (client instanceof CustomException) throw client;

        try {
            client.query('BEGIN;');

            const findQuery = this.siteQuery.isExistsSiteByUrl(siteUrl.url);
            const findResult = await client.query(findQuery);
            if (findResult.rowCount === 0) throw new NotFoundException(`존재하지 않는 사이트입니다. (${siteUrl.url.slice(0, 3) + '...'})`);

            const siteId = findResult.rows[0].id;

            const [
                putSite,
                putSiteDescription
            ] = await Promise.all([
                (async (): Promise<QueryResult<any> | null> => { // find site(out of Promise.all) > update

                    if (siteForPut?.url || siteForPut?.name) {
                        return await client.query(
                            this.siteQuery.putSiteUrlOrName(siteId, siteForPut));
                    } else return null;

                })(),
                (async (): Promise<QueryResult<any> | null> => { // find site-description > update or insert
                    
                    if (siteForPut?.description) {

                        const findResult = await client.query(
                            this.siteQuery.isExistsSiteDescriptionBySiteId(siteId));
    
                        return await client.query(
                            (findResult.rowCount === 0) ?
                                this.siteQuery.postSiteDescription(siteId, siteForPut.description) :
                                this.siteQuery.putSiteDescription(siteId, siteForPut.description));

                    } else return null;
                    
                })()
            ]);

            client.query('COMMIT;');

            if (putSite !== null) return putSite;
            else throw new BadRequestException('최소 하나 이상의 수정 사항을 입력해야 합니다.');

        } catch(err) {

            client.query('ROLLBACK;');
            client.release();

            throw this.errorHandler(err);

        }
        
    }

    public async disableSite(siteUrl: SiteUrl) {

        const client = await this.pgFactory.getClient();
        if (client instanceof CustomException) throw client;

        try {
            
            const [

                saveResult,
                destroyResult

            ] = await Promise.all([
                (async () => { // Save Data from site to site_disabled (or, site_description to site_description_disabled)
                    
                    const findResult = await client.query(
                        this.siteQuery.getSiteByUrl(siteUrl.url));

                    if (findResult.rowCount) throw new NotFoundException('찾지 못함');

                    const site = await this.dtoBuilder.getSite(findResult.rows[0]);
                    
                    const result = await client.query(
                        this.siteQuery.postDisabledSite(site));

                    if (site.description) {
                        const result = await client.query(
                            this.siteQuery.postDisabledSiteDescription(findResult.rows[0]?.id, site.description));
                    }
                    
                }), // Part of Big Promise
                (async () => { // Delete data site, site_description

                    const findResult = await client.query(
                        this.siteQuery.isExistsSiteByUrl(siteUrl.url));
                    const findDescripResult = client.query(
                            this.siteQuery.isExistsSiteDescriptionBySiteId(findResult.rows[0].id));

                    if (findResult.rowCount === 0) throw new NotFoundException('찾지 못함');

                    const deleteRessults = await Promise.all([
                        (async ()=>{
                            return await client.query(
                                this.siteQuery.deleteSite(siteUrl.url));
                        }), // Part of Mini Promise
                        (async ()=>{
                            return await client.query(
                                this.siteQuery.deleteSite(findResult.rows[0].id));
                        }), // Part of Mini Promise
                    ]); // End of Mini Promise

                    const checkResults = await Promise.all([
                        (async () => {
                            return await client.query(
                                this.siteQuery.isExistsSiteByUrl(siteUrl.url))
                        }), // Part of Mini Promise
                        (async () => {
                            return await client.query(
                                this.siteQuery.isExistsSiteDescriptionBySiteId(findResult.rows[0].id))
                        }), // Part of Mini Promise
                    ]); // End of Mini Promise

                }) // Part of Big Promise
            ]) // End of Big Promise

        } catch(err) {
    
            client.query('ROLLBACK;');
            client.release();
    
            throw this.errorHandler(err);
    
        }

    }

}