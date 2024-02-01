import { Resolver, Query, Mutation, Int, Args } from '@nestjs/graphql';
import { Expense } from './expense.entity';
import { CreateExpenseInput } from './expense.input';
import { ExpenseService } from './expense.service';
import { ExpenseListDto } from './expense.dto';

@Resolver()
export class ExpenseResolver {
  constructor(private expenseService: ExpenseService) {}

  @Query(() => ExpenseListDto)
  async getExpensesByUserId(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<ExpenseListDto> {
    const expenses: Expense[] =
      await this.expenseService.getExpensesByUserId(userId);

    const total: number = expenses.reduce(
      (acc: number, expense) => acc + Number(expense.total),
      0,
    );

    const expenseList: ExpenseListDto = new ExpenseListDto(
      expenses,
      Math.round(total * 100) / 100,
    );
    return expenseList;
  }

  @Mutation(() => Expense)
  async createExpense(
    @Args('createExpenseData')
    createExpenseData: CreateExpenseInput,
  ): Promise<Expense> {
    const expense = await this.expenseService.createExpense(createExpenseData);
    return expense;
  }

  @Mutation(() => Expense)
  async deleteExpense(
    @Args('id', { type: () => Int })
    id: number,
  ): Promise<Expense> {
    const expense = await this.expenseService.deleteExpense(id);
    return expense;
  }
}
