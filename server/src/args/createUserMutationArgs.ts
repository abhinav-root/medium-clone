import { ArgsType, Field } from "type-graphql";
import {
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsAlphanumeric,
  Validate,
} from "class-validator";
import { CheckEmailExists } from "./validation/checkifEmailExists";
import { CheckIfUsernameTaken } from "./validation/checkifUsernameTaken";

@ArgsType()
export class CreateUserMutationArgs {
  @Field((type) => String)
  @Validate(CheckIfUsernameTaken)
  @MinLength(3, { message: "Username must be atleast 3 characters" })
  @MaxLength(45, { message: "Username is too long" })
  @IsNotEmpty({ message: "Username cannot be empty" })
  username: string;

  @Field((type) => String)
  @Validate(CheckEmailExists)
  @IsEmail({}, { message: "Please enter a valid email" })
  @IsNotEmpty({ message: "Email cannot be empty" })
  email: string;

  @Field((type) => String)
  @MinLength(6, { message: "Password must be atleast 6 characters" })
  @MaxLength(20, { message: "Password is too long" })
  @IsNotEmpty({ message: "Password cannot be empty" })
  password: string;
}
