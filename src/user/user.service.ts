import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserEmailInput } from './user.input';
import { GraphQLError } from 'graphql/error/GraphQLError';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(includeExpenses: boolean): Promise<User[]> {
    const users: User[] = await this.usersRepository.find({
      relations: includeExpenses ? ['expenses'] : [],
    });
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { id },
      relations: ['expenses'],
    });
    return user;
  }

  async createUser(createUserData: CreateUserInput): Promise<User> {
    const newUser: User = this.usersRepository.create(createUserData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateUserEmail(updateUserEmail: UpdateUserEmailInput): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { id: updateUserEmail.userId },
    });

    if (!user) {
      throw new GraphQLError('User not found', {
        extensions: {
          code: HttpStatus.NOT_FOUND,
        },
      });
    }

    // Email is the same so no changes
    if (user.email === updateUserEmail.email) {
      return user;
    }

    const userFound: User = await this.usersRepository.findOne({
      where: { email: updateUserEmail.email },
    });

    if (userFound && userFound.id !== updateUserEmail.userId) {
      throw new GraphQLError(`Use a different email ${updateUserEmail.email}`, {
        extensions: {
          code: HttpStatus.BAD_REQUEST,
        },
      });
    }

    user.email = updateUserEmail.email;
    await this.usersRepository.save(user);
    return user;
  }
}
