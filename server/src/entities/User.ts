import { Field, ID, ObjectType } from "type-graphql";
import { Post } from "./Post";

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  username: string;

  @Field((type) => [Post])
  posts: Post[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
