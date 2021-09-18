import { Field, ID, Int, ObjectType } from "type-graphql";
import { Comment } from "./Comment";

@ObjectType()
export class Post {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  content: string;

  @Field((type) => String)
  creatorName: string;

  @Field((type) => Int)
  commentCount: number;

  @Field((type) => Int)
  upvotes: number;

  @Field((type) => Int)
  downvotes: number;

  @Field((type) => ID)
  creatorId: string;

  @Field((type) => [Comment])
  comments: Comment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
