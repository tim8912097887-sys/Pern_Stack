export class ApiError extends Error {
/** 
   * Creates an instance of ApiError.
   * @param {number} statusCode - The HTTP status code (e.g., 404, 500).
   * @param {string} message - The error message.
   * 
   *
*/
    constructor(statusCode,message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }

}