import ApiError from "./api-error";

class ForbiddenError extends ApiError {
    constructor(msg: string = `You don't have permission to access this content`) {
        super('Forbidden error', msg, 403);
    }
}

export default ForbiddenError;