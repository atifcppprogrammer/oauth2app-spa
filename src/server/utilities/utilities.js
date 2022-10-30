import ApiError from "./ApiError";

export const responseFactory = {
  errorResponse(response, error, status, name) {
    let responseObject;
    if (!(error instanceof Error)) {
      throw new ApiError(`argument provided to "errorResponse()" must be instance of Error class`);
    } else if (error instanceof Error) {
      responseObject = ApiError.from(error, status, name).getResponseObject();
    } else if (error instanceof ApiError) {
      responseObject = error.getResponseObject();
    }

    const { status: code } = responseObject;
    return response.status(code).send(responseObject);
  },
  successResponse(response, status, payload) {
    return response.status(status).send(payload);
  }
}