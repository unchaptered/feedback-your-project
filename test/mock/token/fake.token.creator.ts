import * as jwt from 'jsonwebtoken';

export const createFakeToken = (secret: string, data: Object = {}, options?: jwt.SignOptions): string => {

    return jwt.sign(data, secret, { ...options });

};