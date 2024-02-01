import { InputType, Field } from '@nestjs/graphql';
import { User } from './user.entity';
import { IsEmail } from 'class-validator';

@InputType()
class CreateUserInput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;
}

@InputType()
class UpdateUserEmailInput {
  @Field()
  userId: number;

  @IsEmail()
  @Field()
  email: string;
}

export { CreateUserInput, UpdateUserEmailInput };
