class FieldError {
    public fieldName: string;
    public message: string;

    constructor(fieldName: string, message: string) {
        this.fieldName = fieldName;
        this.message = message;
    }
}

export default FieldError;