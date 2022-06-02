import 'reflect-metadata';

// Testing Module
import { JoiProvider } from '../../../../src/modules/providers/joi.provider';
import { JoiIDevForLogin, JoiIDevForJoin, JoiIDevForToken } from '../../../../src/models/class.loader';

// Dtos & Creator
import mockCreator from '../../../mock/mock.creator';


describe ('Joi Provider', () => {

    let joiProvider: JoiProvider;

    beforeAll(() => {
        joiProvider = new JoiProvider(
            new JoiIDevForLogin(),
            new JoiIDevForJoin(),
            new JoiIDevForToken());
    });


    it ('has 3 properties', () => expect(Object.keys(joiProvider).length).toBe(4));
    it ('has 3 functions', () => {
        expect(joiProvider.validateIDevForJoin).toBeDefined();
        expect(joiProvider.validateIDevForLogin).toBeDefined();
        expect(joiProvider.validateIDevForToken).toBeDefined();
    });


    describe ('logics', () => {


        describe ('validateIDevForJoin', () => {

            it ('should return IDevForJoin', async () => {
                const res = await joiProvider.validateIDevForJoin(
                    mockCreator.Service.iDev.createIDevForJoin(true)
                );
            
                expect(res).not.toBeInstanceOf(Error);
            });

            it ('should return Error', async () => {
                const res = await joiProvider.validateIDevForJoin(
                    mockCreator.Service.iDev.createIDevForJoin(false)
                );
            
                expect(res).toBeInstanceOf(Error);
            });

        });


        describe ('validateIDevForLogin', () => {

            it ('should return IDevForLogin', async () => {
                const res = await joiProvider.validateIDevForLogin(
                    mockCreator.Service.iDev.createIDevForLogin(true)
                );
            
                expect(res).not.toBeInstanceOf(Error);
            });

            it ('should return Error', async () => {
                const res = await joiProvider.validateIDevForLogin(
                    mockCreator.Service.iDev.createIDevForLogin(false)
                );
            
                expect(res).toBeInstanceOf(Error);
            });

        });


        describe ('validateIDevForToken', () => {

            it ('should return IDevForJoin', async () => {
                const res = await joiProvider.validateIDevForToken(
                    mockCreator.Service.iDev.createIDevForToken(true)
                );
            
                expect(res).not.toBeInstanceOf(Error);
            });

            it ('should return Error', async () => {
                const res = await joiProvider.validateIDevForToken(
                    mockCreator.Service.iDev.createIDevForToken(false)
                );
            
                expect(res).toBeInstanceOf(Error);
            });

        });


    });
    

});