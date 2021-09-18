import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Comment } from "../entities/Comment";
import { MyContext } from "../types";

@Resolver()
export class CommentResolver {
  @Mutation((returns) => Comment)
  async createComment(
    @Ctx() { req, res, prisma }: MyContext,
    @Arg("postId") postId: string,
    @Arg("content") content: string
  ) {
    const author = req.session.username;
    const comment = await prisma.comment.create({
      data: { author, content, postId },
    });
    await prisma.post.update({
      data: { commentCount: { increment: 1 } },
      where: { id: postId },
    });
    return comment;
  }
}
