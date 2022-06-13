import * as Joi from 'joi';

import { ISite, ISiteForPut, ISiteForPost, ISiteUrl } from '../../interface.loader';

const idOption = Joi.string().min(0);
const urlOption = Joi.string().min(1).max(2048);
const nameOption = Joi.string().min(1).max(50);
const descriptionOption = Joi.string().min(1).max(300);


export class Site implements ISite {

    static joiObject = Joi.object<Site>({
        id: idOption,
        url: urlOption.required(),
        name: nameOption.required(),
        description: descriptionOption
    });

    id?: number | undefined;
    name: string;
    url: string;
    description?: string | undefined;

    constructor(site: ISite) {
        this.id = site?.id;
        this.name = site.name;
        this.url = site.url;
        this.description = site?.description;
    }

}

export class SiteForPost implements ISiteForPost {

    static joiObject = Joi.object<SiteForPost>({
        url: urlOption.required(),
        name: nameOption.required(),
        description: descriptionOption
    });

    url: string;
    name: string;
    description?: string | undefined;

    constructor(site: ISiteForPost) {
        this.url = site.url;
        this.name = site.name;
        this.description = site?.description;
    }
    
};

export class SiteForPut implements ISiteForPut {

    static joiObject = Joi.object<SiteForPut>({
        url: urlOption,
        name: nameOption,
        description: descriptionOption
    });

    url?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;

    constructor(site: ISiteForPut) {
        this.url = site?.url;
        this.name = site?.name;
        this.description = site?.description;
    }
    
};

export class SiteUrl implements ISiteUrl {

    static joiObject = Joi.object<SiteUrl>({
        url: urlOption.required()
    });
    
    url: string;

    constructor(site: ISiteUrl) {
        this.url = site.url;
    }

};