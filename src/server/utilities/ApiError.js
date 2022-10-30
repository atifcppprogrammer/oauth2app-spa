import * as httpStatus from "http-status";

class ApiError extends Error {
  constructor(message, status, name) {
    super(message);
    this.status = status ? status : httpStatus.INTERNAL_SERVER_ERROR;
    this.name = name ? name : "APIError";
  }

  static from(error, status, name) {
    if (!(error instanceof Error)) {
      throw new ApiError("argument provided to from must be instance of Error class");
    }
    return new ApiError(error.message, status, name);
  }

  getResponseObject() {
    return {
      error: { message: this.message, name: this.name },
      status: this.status
    };
  }
}

export default ApiError;