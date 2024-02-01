import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
class CreateExpenseInput {
  @Field(() => Int)
  user: number;

  @Field({ nullable: false, defaultValue: false })
  name: string;

  @Field({ nullable: true, defaultValue: false })
  description?: string;

  @Field({ nullable: false, defaultValue: false })
  total: string;
}

export { CreateExpenseInput };
