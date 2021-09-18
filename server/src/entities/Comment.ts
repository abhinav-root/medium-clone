import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Comment {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  author: string;

  @Field((type) => String)
  content: string;

  @Field((type) => ID)
  postId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
