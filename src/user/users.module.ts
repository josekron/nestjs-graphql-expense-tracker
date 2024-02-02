import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { ExpenseService } from '../expense/expense.service';
import { User } from './user.entity';
import { Expense } from '../expense/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Expense])],
  providers: [UserResolver, UserService, ExpenseService],
})
export class UserModule {}
