import { responseFactory } from "../utilities";
import httpStatus from "http-status";

export const index = (_, response) => {
  responseFactory.successResponse(response, httpStatus.OK, {
    message: "oauth2app-spa"
  });
}