export interface I_FILTERS  {

    Join: symbol,
    Login: symbol

}

export const FILTERS: I_FILTERS = {

    Join: Symbol.for('JoinFilter'),
    Login: Symbol.for('LoginFilter')

};