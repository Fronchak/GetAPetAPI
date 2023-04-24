import ApiError from "./api-error";

class UserNotFoundError extends ApiError {
    constructor() {
        super('Unauthorized error', 'User not found', 401);
    }
}

export default UserNotFoundError;