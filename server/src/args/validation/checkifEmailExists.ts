import { PrismaClient } from ".prisma/client";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
export class CheckEmailExists implements ValidatorConstraintInterface {
  async validate(
    value: any,
    validationArguments?: ValidationArguments
  ): Promise<boolean> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { email: value } });
    if (user) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "Email is already registered";
  }
}
