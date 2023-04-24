class ErrorResponse {
    public error: string;
    public message: string;
    public status: number;

    constructor(error: string, message: string, status: number) {
        this.error = error;
        this.message = message;
        this.status = status;
    }
}

export default ErrorResponse;