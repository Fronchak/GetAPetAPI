import ApiError from "./api-error";

class BadRequestError extends ApiError {
    constructor(message: string) {
        super('Bad request', message, 400);
    }
}

export default BadRequestError;