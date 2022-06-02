import { Algorithm } from 'jsonwebtoken';


export const getStringEnv = (KEY: string): string => {
    const VALUE = process.env[KEY];

    if (VALUE) return VALUE;
    else return 'undefined';
};
export const getNumberEnv = (KEY: string): number => {
    const VALUE = process.env[KEY];

    if (VALUE) {
        if (isNaN(+VALUE)) return -9999;
        else return +VALUE;
    } else return -9999;
}
export const getAlgorihtmEnv = (KEY: string): Algorithm => {

    const targets: Algorithm[] = [ 'HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512', 'PS256', 'PS384', 'PS512', 'none' ];

    const tar = process.env.JWT_ALGORITHM;
    const val = targets.find(val => val === tar);

    if (!val) return 'none';
    else return val;

}

export const isValid = (iter: Iterable<any>) => {
    
    for (const val of iter) {

        if (val instanceof Object)
            for (const v of val)
                if (v === 'undefined' || v === - 9999) throw new Error('환경 변수가 누락되었습니다.');
        else
            if (val === 'undefined' || val === -9999) throw new Error('환경 변수가 누락되었습니다.');

    }

}