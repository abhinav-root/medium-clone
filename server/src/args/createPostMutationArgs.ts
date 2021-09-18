import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreatePostMutationArgs {
  @Field((type) => String)
  title: string;

  @Field((type) => String)
  content: string;
}
