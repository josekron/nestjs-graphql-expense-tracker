import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Expense } from './expense.entity';

@ObjectType()
class ExpenseListDto {
  @Field(() => [Expense])
  expenses: Expense[];

  @Field(() => Float)
  total: number;

  constructor(expenses: Expense[], total: number) {
    this.expenses = expenses;
    this.total = total;
  }
}

export { ExpenseListDto };
