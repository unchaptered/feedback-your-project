import 'reflect-metadata';

// Testing Module
import { DtoBuilder, JoiValidator } from '../../../../src/modules/module.loader';
import { BaseModule } from '../../../../src/modules/base/base.modules';
import mockCreator from '../../../mock/mock.creator';

// Dto
import { Dev, DevForJoin, DevForLogin, DevForToken } from '../../../../src/models/class.loader';


describe ('Dto Builder', () => {

    let dtoBuilder: DtoBuilder;
    let joiValidator: JoiValidator;

    beforeAll(() => {
        dtoBuilder = new DtoBuilder(new JoiValidator());
    });

    describe ('properties', () => {

        it ('has 4 public functions', () => {

            expect(dtoBuilder.getDev).toBeDefined();
            expect(dtoBuilder.getDevForJoin).toBeDefined();
            expect(dtoBuilder.getDevForToken).toBeDefined();
            expect(dtoBuilder.getDevForLogin).toBeDefined();
    
        });
        it ('extends BaseModule', () => expect(dtoBuilder).toBeInstanceOf(BaseModule));

    });


    describe ('logics', () => {

        it ('getDev', async () => {

            const iDev = mockCreator.Service.iDev.createIDev(10);
            const dev = await dtoBuilder.getDev(iDev);

            expect(dev).toBeInstanceOf(Dev);

        });

        it ('getDevForJoin', async () => {

            const iDevForJoin = mockCreator.Service.iDev.createIDevForJoin();
            const dev = await dtoBuilder.getDevForJoin(iDevForJoin);

            expect(dev).toBeInstanceOf(DevForJoin);

        });

        it ('getDevForToken', async () => {

            const iDevForToken = mockCreator.Service.iDev.createIDevForToken(30);
            const dev = await dtoBuilder.getDevForToken(iDevForToken);

            expect(dev).toBeInstanceOf(DevForToken);

        });

        it ('getDevForLogin', async () => {

            const iDevForLogin = mockCreator.Service.iDev.createIDevForLogin();
            const dev = await dtoBuilder.getDevForLogin(iDevForLogin);

            expect(dev).toBeInstanceOf(DevForLogin);
            
        });

    });

});