import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserEmailInput } from './user.input';
import { UserService } from './user.service';
import { FieldMap } from '@jenyus-org/nestjs-graphql-utils';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { nullable: true })
  async getUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    const user: User = await this.userService.getUserById(id);
    return user;
  }

  @Query(() => [User])
  async getUsers(@FieldMap() fieldMap: typeof FieldMap): Promise<User[]> {
    const includeExpenses = fieldMap['getUsers'].expenses ? true : false;
    const users: User[] = await this.userService.getUsers(includeExpenses);
    return users;
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    const user: User = await this.userService.createUser(createUserData);
    return user;
  }

  @Mutation(() => User)
  async updateUserEmail(
    @Args('userEmailData') userEmailData: UpdateUserEmailInput,
  ): Promise<User> {
    const user: User = await this.userService.updateUserEmail(userEmailData);
    return user;
  }
}
