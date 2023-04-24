import ApiError from "./api-error";

class EntityNotFoundError extends ApiError {
    constructor(message: string) {
        super('Entity not found', message, 404);
    }
}

export default EntityNotFoundError;