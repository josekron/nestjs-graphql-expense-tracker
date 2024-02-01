import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserEmailInput } from './user.input';
import { UserService } from './user.service';
import { FieldMap } from '@jenyus-org/nestjs-graphql-utils';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { description: 'return the user id' })
  async getUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    const user: User = await this.userService.getUserById(id);
    return user;
  }

  @Query(() => [User], { description: 'return all users' })
  async getUsers(@FieldMap() fieldMap: typeof FieldMap): Promise<User[]> {
    const includeExpenses: boolean = fieldMap['getUsers'].expenses
      ? true
      : false;
    const users: User[] = await this.userService.getUsers(includeExpenses);
    return users;
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
