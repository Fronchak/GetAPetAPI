import ApiError from "./api-error";

class UnauthorizedError extends ApiError {
    constructor(msg: string = 'You must be logged in to access this content') {
        super('Unauthorized error', msg , 401);
    }
}

export default UnauthorizedError;