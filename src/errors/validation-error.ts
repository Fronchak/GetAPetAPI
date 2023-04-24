import ApiError from "./api-error";
import FieldError from "./field-error";

class ValidationError extends ApiError {
    public errors: Array<FieldError>;

    constructor(errors: Array<FieldError>) {
        super('Validation error', 'Invalid inputs', 422);
        this.errors = errors;
    }

    public addFieldError(fieldError: FieldError): void {
        this.errors.push(fieldError);
    }

    public addError(fieldName: string, message: string): void {
        this.addFieldError(new FieldError(fieldName, message));
    }
}

export default ValidationError;