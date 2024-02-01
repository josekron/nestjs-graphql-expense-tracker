import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Expense } from '../expense/expense.entity';
import { CreateExpenseInput } from './expense.input';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql/error/GraphQLError';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * getExpensesByUserId: return a list of expenses for an user.
   *
   * We don't check if the user exists, because we don't want to expose
   * the existence of the user.
   *
   */
  async getExpensesByUserId(userId: number): Promise<Expense[]> {
    const expenses: Expense[] = await this.expenseRepository.find({
      where: { user: userId },
      relations: ['user'],
    });

    return expenses;
  }

  async createExpense(createExpenseData: CreateExpenseInput): Promise<Expense> {
    const user: User = await this.userRepository.findOneBy({
      id: createExpenseData.user,
    });

    if (!user) {
      throw new GraphQLError('User not found', {
        extensions: {
          code: HttpStatus.NOT_FOUND,
        },
      });
    }

    const newExpense: Expense =
      this.expenseRepository.create(createExpenseData);
    const savedExpense: Expense = await this.expenseRepository.save(newExpense);

    return savedExpense;
  }

  async deleteExpense(id: number): Promise<Expense> {
    const expense: Expense = await this.expenseRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!expense) {
      throw new GraphQLError('Expense not found', {
        extensions: {
          code: HttpStatus.NOT_FOUND,
        },
      });
    }

    await this.expenseRepository.delete(id);

    return expense;
  }
}
