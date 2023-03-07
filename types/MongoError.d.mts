export default class MongoError extends Error {
    constructor(e: {}, eMap: any);
    _isCustomError: boolean;
    _isMongoError: boolean;
    service: string;
    message: any;
    statusCode: any;
    errorCode: any;
    error: {};
}
