import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { ExpenseService } from '../expense/expense.service';
import { Expense } from '../expense/expense.entity';
import { ExpenseResolver } from '../expense/expense.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Expense])],
  providers: [ExpenseService, ExpenseResolver],
})
export class ExpenseModule {}
