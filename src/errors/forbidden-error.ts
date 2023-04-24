import ApiError from "./api-error";

class ForbiddenError extends ApiError {
    constructor() {
        super('Forbidden error', `You don't have permission to access this content`, 403);
    }
}

export default ForbiddenError;