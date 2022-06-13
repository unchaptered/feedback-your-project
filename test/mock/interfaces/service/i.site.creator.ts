import * as faker from 'faker';

// Mock Target
import { ISite } from "../../../../src/models/interface.loader";


export const createISite = (): ISite => {

    return {

        id: faker.random.number(),

        url: faker.internet.url(),
        name: faker.internet.userName(),

        description: faker.commerce.productDescription(),

    }
}