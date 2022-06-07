import 'reflect-metadata';
import {
    CustomException, // SuperClass of All Exceptions

    BadRequestException, // 400
    NotFoundException, // 404
    ConflictException, // 409
    IntervalServerError, // 500
    UnkownServerError, // 500
} from '../../../../../src/models/class.loader';


describe ('Custom Exception', () => {

    const NAME = 'sample_name';
    const MESSAGE = 'sample_message';
    const STATUS_CODE = 200;

    const badRequestException: BadRequestException = new BadRequestException(MESSAGE);
    const notFoundException: NotFoundException = new NotFoundException(MESSAGE);
    const conflictException: ConflictException = new ConflictException(MESSAGE);
    const interverServerError: IntervalServerError = new IntervalServerError(MESSAGE);
    const unkownServerError: UnkownServerError = new UnkownServerError(MESSAGE);

    it ('ALL Exception extends CustomException', () => {

        expect(badRequestException).toBeInstanceOf(CustomException);
        expect(notFoundException).toBeInstanceOf(CustomException);
        expect(conflictException).toBeInstanceOf(CustomException);
        expect(interverServerError).toBeInstanceOf(CustomException);
        expect(unkownServerError).toBeInstanceOf(CustomException);

    });

    it ('All Exception do not extedns Error', () => {

        expect(badRequestException).not.toBeInstanceOf(Error);
        expect(notFoundException).not.toBeInstanceOf(Error);
        expect(conflictException).not.toBeInstanceOf(Error);
        expect(interverServerError).not.toBeInstanceOf(Error);
        expect(unkownServerError).not.toBeInstanceOf(Error);
        
    });

    describe ('check details', () => {

        it ('badRequestException has 400 statusCode', () => {
            
            expect(badRequestException.name).toBe('BadRequestException');
            expect(badRequestException.message).toBe(MESSAGE);
            expect(badRequestException.statusCode).toBe(400);

        });

        it ('notFoundException has 404 statusCode', () => {
            
            expect(notFoundException.name).toBe('NotFoundException');
            expect(notFoundException.message).toBe(MESSAGE);
            expect(notFoundException.statusCode).toBe(404);

        });

        it ('conflictException has 409 statusCode', () => {
            
            expect(conflictException.name).toBe('ConflictException');
            expect(conflictException.message).toBe(MESSAGE);
            expect(conflictException.statusCode).toBe(409);

        });

        it ('interverServerError has 500 statusCode', () => {
            
            expect(interverServerError.name).toBe('IntervalServerError');
            expect(interverServerError.message).toBe(MESSAGE);
            expect(interverServerError.statusCode).toBe(500);

        });

        it ('unkownServerError has 500 statusCode', () => {
            
            expect(unkownServerError.name).toBe('UnkownServerError');
            expect(unkownServerError.message).toBe(MESSAGE);
            expect(unkownServerError.statusCode).toBe(500);

        });

    });

});

// describe ('Error', () => {

//     let MESSAGE: string;

//     beforeAll(() => MESSAGE = 'test error message');

    
//     it ('has 3 Exception Class', () => {
//         expect(BadRequestException).toBeDefined();
//         expect(ConflictException).toBeDefined();
//         expect(NotFoundException).toBeDefined();
//     });


//     describe ('BadRequestException', () => {

//         let NEW_EXCEPTION: BadRequestException;
        
//         beforeAll(() => NEW_EXCEPTION = new BadRequestException(MESSAGE));
        
//         it ('instanceof Error = false', () => expect(NEW_EXCEPTION).not.toBeInstanceOf(Error));
//         it ('instanceof BadRequest = true', () => expect(NEW_EXCEPTION).toBeInstanceOf(BadRequestException));


//         describe ('prototype', () => {

//             it ('has 3 properties', () => expect(Object.keys(NEW_EXCEPTION).length).toBe(3));
//             it ('.message = MESSAGE', () => expect(NEW_EXCEPTION.message).toBe(MESSAGE));
//             it ('.name = \'BadRequestException\'', () => expect(NEW_EXCEPTION.name).toBe('BadRequestException'));
//             it ('.statusCode = 400', () => expect(NEW_EXCEPTION.statusCode).toBe(400));

//         });

//     });

//     describe ('NotFoundException', () => {

//         let NEW_EXCEPTION: NotFoundException;
        
//         beforeAll(() => NEW_EXCEPTION = new NotFoundException(MESSAGE));


//         it ('instanceof Error = false', () => expect(NEW_EXCEPTION).not.toBeInstanceOf(Error));
//         it ('instanceof NotFound = true', () => expect(NEW_EXCEPTION).toBeInstanceOf(NotFoundException));


//         describe ('prototype', () => {

//             it ('has 3 properties', () => expect(Object.keys(NEW_EXCEPTION).length).toBe(3));
//             it ('.message = MESSAGE', () => expect(NEW_EXCEPTION.message).toBe(MESSAGE));
//             it ('.name = \'NotFoundException\'', () => expect(NEW_EXCEPTION.name).toBe('NotFoundException'));
//             it ('.statusCode = 404', () => expect(NEW_EXCEPTION.statusCode).toBe(404));

//         });

//     });


//     describe ('ConflictException', () => {

        
//         let NEW_EXCEPTION: ConflictException;
        
//         beforeAll(() => NEW_EXCEPTION = new ConflictException(MESSAGE));

        
//         it ('instanceof Error = false', () => expect(NEW_EXCEPTION).not.toBeInstanceOf(Error));
//         it ('instanceof Conflict = true', () => expect(NEW_EXCEPTION).toBeInstanceOf(ConflictException));
        
        
//         describe ('prototype', () => {
            
//             it ('has 3 properties', () => expect(Object.keys(NEW_EXCEPTION).length).toBe(3));
//             it ('.message = MESSAGE', () => expect(NEW_EXCEPTION.message).toBe(MESSAGE));
//             it ('.name = \'ConflictException\'', () => expect(NEW_EXCEPTION.name).toBe('ConflictException'));
//             it ('.statusCode = 409', () => expect(NEW_EXCEPTION.statusCode).toBe(409));

//         });

//     });

    
// });