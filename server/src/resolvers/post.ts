import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CreatePostMutationArgs } from "../args/createPostMutationArgs";
import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { isAuth } from "../middlewares/isAuth";

@Resolver()
export class PostResolver {
  // create a new post
  @Mutation((returns) => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Ctx() { req, res, prisma }: MyContext,
    @Args() { title, content }: CreatePostMutationArgs
  ) {
    try {
      const creatorName = req.session.username;
      const post = prisma.post.create({
        data: {
          title,
          content,
          creatorId: req.session.userId,
          creatorName,
        },
        include: { comments: true },
      });
      return post;
    } catch (err) {
      console.log(err);
    }
  }

  // get all posts of user
  @Query((returns) => [Post])
  @UseMiddleware(isAuth)
  async getPosts(@Ctx() { req, res, prisma }: MyContext) {
    const posts = await prisma.post.findMany({
      where: { creatorId: req.session.userId },
      include: { comments: true },
    });
    return posts;
  }

  @Query((returns) => Post)
  @UseMiddleware(isAuth)
  async getPost(@Arg("id") id: string, @Ctx() { req, res, prisma }: MyContext) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { comments: true },
    });
    console.log(post, "getPost");
    return post;
  }
}
