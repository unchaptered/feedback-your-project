import { CustomException, IntervalServerError, UnkownServerError } from '../../models/class.loader';

export const errorHandler = (err: unknown) => {

    if (err instanceof Error) return new IntervalServerError(err.message);
    else if (err instanceof CustomException) return err;
    else return new UnkownServerError(JSON.stringify(err));

}