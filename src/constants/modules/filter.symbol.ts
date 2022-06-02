export interface I_FILTERS  {

    IDevForJoin: symbol,
    IDevForLogin: symbol,
    IDevForToken: symbol,

}

export const FILTERS: I_FILTERS = {

    IDevForJoin: Symbol.for('IDevForJoinFilter'),
    IDevForLogin: Symbol.for('IDevForLoginFilter'),
    IDevForToken: Symbol.for('IDevForTokenFilter')

};