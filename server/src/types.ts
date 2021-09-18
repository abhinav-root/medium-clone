import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import { Session } from "express-session";

export type MyContext = {
  req: Request;
  res: Response;
  prisma: PrismaClient;
};

declare module "express-session" {
  interface Session {
    userId: string;
    username: string;
  }
}
