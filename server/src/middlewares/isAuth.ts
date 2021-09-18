import { AuthenticationError } from "apollo-server-errors";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    return new AuthenticationError("User is not authenticated");
  }
  return next();
};
