import "reflect-metadata";
import { PrismaClient } from ".prisma/client";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import express from "express";
import { PostResolver } from "./resolvers/post";
import { CommentResolver } from "./resolvers/comment";
import redis = require("redis");
import connectRedis from "connect-redis";
import session from "express-session";
import { COOKIE_NAME, COOKIE_SECRET, MY_ENV } from "./constants";

async function main() {
  const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
    errorFormat: "pretty",
  });
  await prisma.$connect();
  console.log("Connected to prisma");

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      name: COOKIE_NAME,
      saveUninitialized: false,
      secret: COOKIE_SECRET || "cookie_secret",
      cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        sameSite: "lax",
        secure: MY_ENV,
      },
      resave: false,
    })
  );

  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver, CommentResolver],
    dateScalarMode: "timestamp",
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, prisma }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    },
  });

  app.listen(5000, () => console.log("server started"));
}

main().catch((err) => console.log(err));
