import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserEmailInput } from './user.input';
import { UserService } from './user.service';
import { ExpenseService } from '../expense/expense.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private expenseService: ExpenseService,
  ) {}

  @Query(() => User, { description: 'return the user id' })
  async getUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    const user: User = await this.userService.getUserById(id);
    return user;
  }

  @Query(() => [User], { description: 'return all users' })
  async getUsers(): Promise<User[]> {
    const users: User[] = await this.userService.getUsers();
    return users;
  }

  /**
   * We are adding a resolve to the expenses field of the User
   *
   * In this case, this is not the most optimised way when calling to getUsers()
   * because we are calling to this resolve for each user. Therefore, it would
   * make more sense to include the relation 'expenses' when querying the database
   * for all users.
   */
  @ResolveField()
  async expenses(@Parent() user: User) {
    const { id } = user;
    const expenses = await this.expenseService.getExpensesByUserId(id);
    return expenses;
  }

  @Mutation(() => User, { description: 'create a new user' })
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    const user: User = await this.userService.createUser(createUserData);
    return user;
  }

  @Mutation(() => User, { description: 'update the email of a user' })
  async updateUserEmail(
    @Args('userEmailData') userEmailData: UpdateUserEmailInput,
  ): Promise<User> {
    const user: User = await this.userService.updateUserEmail(
      userEmailData.userId,
      userEmailData.email,
    );
    return user;
  }
}
