import 'reflect-metadata';

// Testing Module
import { JoiProvider } from '../../../../src/modules/providers/joi.provider';

// Dtos & Creator
import { IUser, IUserDetail } from '../../../../src/models/interface.loader';
import mockCreator from '../../../mock/mock.creator';


describe ('Joi Provider', () => {

    let joiProvider: JoiProvider;

    beforeAll(() => {
        joiProvider = new JoiProvider();
    });

    describe ('properties', () => {
        
        it ('2 joi obj', () => {

            expect(joiProvider.UserJoi).toBeDefined();
            expect(joiProvider.UserDetailJoi).toBeDefined();

        });

        it ('2 func', () => {

            expect(typeof joiProvider.validateUser).toBe('function');
            expect(typeof joiProvider.validateUserDetail).toBe('function');

        });

    });

    describe ('logics', () => {

        describe ('validateUserDetail', () => {

            it ('should return IUserDetail', async () => {

                const user: IUserDetail = mockCreator.iUser.createIUserDetail();

                const userAft = await joiProvider.validateUserDetail(user);
                expect(userAft instanceof Error).toBeFalsy();
    
            });

            it ('should return Error', async () => {

                const user: IUserDetail = mockCreator.iUser.createIUserDetail();
                user.email = user.email.substring(1, 1);

                const userAft = await joiProvider.validateUserDetail(user);
                expect(userAft instanceof Error).toBeTruthy();
    
            });

        });

        describe ('validateUser', () => {

            it ('should return IUser', async () => {

                const user: IUser = mockCreator.iUser.createIUser();
                
                const userAft = await joiProvider.validateUser(user);
                expect(userAft instanceof Error).toBeFalsy();

            });

            it ('should return IUser', async () => {

                const user: IUser = mockCreator.iUser.createIUser();
                user.email = user.email.substring(1, 1);

                const userAft = await joiProvider.validateUser(user);
                expect(userAft instanceof Error).toBeTruthy();

            });

        });

    });

    

});