import FieldError from "../errors/field-error";
import ErrorResponse from "./error-response";

class ValidationErrorResponse extends ErrorResponse {
    public errors: Array<FieldError>

    constructor(error: string, message: string, status: number, errors: Array<FieldError>) {
        super(error, message, status);
        this.errors = errors;
    }
}

export default ValidationErrorResponse;