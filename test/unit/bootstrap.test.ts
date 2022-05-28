import { MODE, runServer } from '../../src/bootstrap';

describe ('MODE', () => {

    it ('MODE equal process.env.NODE_ENV', () => {

        expect(MODE).toBe(process?.env?.NODE_ENV ?? 'test');

    });

});