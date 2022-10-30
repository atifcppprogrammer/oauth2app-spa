import { ApiError } from "../utilities";
import httpStatus from "http-status";

export default () => {
  return (_, __, next) => {
    next(ApiError(
      "Could not find the requested resource",
      httpStatus.NOT_FOUND
    ));
  }
}