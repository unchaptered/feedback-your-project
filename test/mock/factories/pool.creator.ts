// Mock Target
import { PoolClient } from "pg";

// const createMockQueryResult = async (): Promise<QueryResult<any>> => {

//     return {
//         oid: 1,
//         command: 'test',
//         fields: [],
//         rowCount: 3,
//         rows: [ 'one','two','three' ]
//     };

// };

// const createMockQueryArrayResult = async (): Promise<QueryArrayResult<any>> => {

//     try {
//         return await createMockQueryResult()
//     } catch (err) {
//         return err;
//     }

// }

export const createPoolClient = (): PoolClient => {

    return {
        addListener: jest.fn(),
        connect: jest.fn(),
        copyFrom: jest.fn(),
        copyTo: jest.fn(),
        emit: jest.fn(),
        escapeIdentifier: jest.fn(),
        escapeLiteral: jest.fn(),
        eventNames: jest.fn(),
        getMaxListeners: jest.fn(),
        listenerCount: jest.fn(),
        listeners: jest.fn(),
        off: jest.fn(),
        on: jest.fn(),
        once: jest.fn(),
        pauseDrain: jest.fn(),
        prependListener: jest.fn(),
        prependOnceListener: jest.fn(),
        query: jest.fn(),
        rawListeners: jest.fn(),
        release: jest.fn(),
        removeAllListeners: jest.fn(),
        removeListener: jest.fn(),
        resumeDrain: jest.fn(),
        setMaxListeners: jest.fn(),
    };

};