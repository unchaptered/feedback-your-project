export interface I_GUARDS  {

    accessToken: symbol,
    refreshToken: symbol

}

export const GUARDS: I_GUARDS = {

    accessToken: Symbol.for('accessToken'),
    refreshToken: Symbol.for('refreshToken')

};