import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CreateUserMutationArgs } from "../args/createUserMutationArgs";
import { User } from "../entities/User";
import { MyContext } from "../types";
import argon from "argon2";
import { isAuth } from "../middlewares/isAuth";
import { UserInputError } from "apollo-server-errors";

@Resolver()
export class UserResolver {
  // create a new user
  @Mutation((returns) => User)
  async createUser(
    @Ctx() { prisma, req }: MyContext,
    @Args() { username, email, password }: CreateUserMutationArgs
  ) {
    password = await argon.hash(password, { saltLength: 14 });
    const user = await prisma.user.create({
      data: { username, email, password },
    });
    console.log(user, "user created");
    req.session.userId = user.id;
    req.session.username = user.username;
    return user;
  }

  // login user
  @Mutation((returns) => User)
  async loginUser(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { prisma, req }: MyContext
  ) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: usernameOrEmail,
            },
          },
          { username: { equals: usernameOrEmail } },
        ],
        NOT: {
          email: {
            endsWith: "hotmail.com",
          },
        },
      },
    });
    if (user && (await argon.verify(user.password, password))) {
      req.session.userId = user.id;
      req.session.username = user.username;
      console.log(user, "user login");
      return user;
    } else {
      throw new UserInputError("Invalid username/email or password");
    }
  }
}
