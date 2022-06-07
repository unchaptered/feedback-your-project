import { BadRequestException, CustomException, IntervalServerError, UnkownServerError } from '../../models/class.loader';

export const errorHandler = (err: unknown) => {

    if (err instanceof CustomException) return err;
    else if (err instanceof Error) return new IntervalServerError(err.message);
    else return new UnkownServerError(JSON.stringify(err));

}

export const errorParamsHandler = (err: unknown) => {

    if (err instanceof CustomException) return err;
    else if (err instanceof Error) return new BadRequestException(err.message);
    else return new UnkownServerError(JSON.stringify(err));


}