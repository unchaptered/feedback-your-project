export interface ISite {

    id?: number;

    url: string;
    name: string;
    description?: string;
    // tokenValue?: string;

};

export interface ISiteForPost {

    url: string;
    name: string;
    description?: string;

};

export interface ISiteForPut {

    url?: string;
    name?: string;
    description?: string;

};

export interface ISiteUrl {

    url: string;

};