export interface I_JOY  {

    iDevForJoin: symbol,
    iDevForLogin: symbol,
    iDevForToken: symbol,

}

export const JOYS: I_JOY = {

    iDevForJoin: Symbol.for('iDevForJoin'),
    iDevForLogin: Symbol.for('iDevForLogin'),
    iDevForToken: Symbol.for('iDevForToken'),
    
};