import { responseFactory } from "../utilities";

export default () => {
  return (error, _, response, __) => {
    responseFactory.errorResponse(response, error);
  }
}