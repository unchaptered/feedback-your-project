export const errHandler = (err: unknown): Error => {
    if (err instanceof Error) return err;
    else return new Error('Unkown error is occured + ' + JSON.stringify(err));
};