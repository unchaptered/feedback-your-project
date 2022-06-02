export interface ICustomException extends Error {

    name: string;
    message: string;
    statusCode: number;
    
}