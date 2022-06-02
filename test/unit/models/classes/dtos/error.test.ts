import 'reflect-metadata';
import { BadRequestException, ConflictException, NotFoundException } from '../../../../../src/models/class.loader';


describe ('Error', () => {

    let MESSAGE: string;

    beforeAll(() => MESSAGE = 'test error message');

    
    it ('has 3 Exception Class', () => {
        expect(BadRequestException).toBeDefined();
        expect(ConflictException).toBeDefined();
        expect(NotFoundException).toBeDefined();
    });


    describe ('BadRequestException', () => {

        let NEW_EXCEPTION: BadRequestException;
        
        beforeAll(() => NEW_EXCEPTION = new BadRequestException(MESSAGE));
        
        it ('instanceof Error = false', () => expect(NEW_EXCEPTION).not.toBeInstanceOf(Error));
        it ('instanceof BadRequest = true', () => expect(NEW_EXCEPTION).toBeInstanceOf(BadRequestException));


        describe ('prototype', () => {

            it ('has 3 properties', () => expect(Object.keys(NEW_EXCEPTION).length).toBe(3));
            it ('.message = MESSAGE', () => expect(NEW_EXCEPTION.message).toBe(MESSAGE));
            it ('.name = \'BadRequestException\'', () => expect(NEW_EXCEPTION.name).toBe('BadRequestException'));
            it ('.statusCode = 400', () => expect(NEW_EXCEPTION.statusCode).toBe(400));

        });

    });

    describe ('NotFoundException', () => {

        let NEW_EXCEPTION: NotFoundException;
        
        beforeAll(() => NEW_EXCEPTION = new NotFoundException(MESSAGE));


        it ('instanceof Error = false', () => expect(NEW_EXCEPTION).not.toBeInstanceOf(Error));
        it ('instanceof NotFound = true', () => expect(NEW_EXCEPTION).toBeInstanceOf(NotFoundException));


        describe ('prototype', () => {

            it ('has 3 properties', () => expect(Object.keys(NEW_EXCEPTION).length).toBe(3));
            it ('.message = MESSAGE', () => expect(NEW_EXCEPTION.message).toBe(MESSAGE));
            it ('.name = \'NotFoundException\'', () => expect(NEW_EXCEPTION.name).toBe('NotFoundException'));
            it ('.statusCode = 404', () => expect(NEW_EXCEPTION.statusCode).toBe(404));

        });

    });


    describe ('ConflictException', () => {

        
        let NEW_EXCEPTION: ConflictException;
        
        beforeAll(() => NEW_EXCEPTION = new ConflictException(MESSAGE));

        
        it ('instanceof Error = false', () => expect(NEW_EXCEPTION).not.toBeInstanceOf(Error));
        it ('instanceof Conflict = true', () => expect(NEW_EXCEPTION).toBeInstanceOf(ConflictException));
        
        
        describe ('prototype', () => {
            
            it ('has 3 properties', () => expect(Object.keys(NEW_EXCEPTION).length).toBe(3));
            it ('.message = MESSAGE', () => expect(NEW_EXCEPTION.message).toBe(MESSAGE));
            it ('.name = \'ConflictException\'', () => expect(NEW_EXCEPTION.name).toBe('ConflictException'));
            it ('.statusCode = 409', () => expect(NEW_EXCEPTION.statusCode).toBe(409));

        });

    });

    
});