import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsDate } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Expense } from '../expense/expense.entity';

@Entity({ name: 'graph_users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @IsEmail()
  @Column({ unique: true, nullable: false })
  @Field()
  email: string;

  @Column({ nullable: false })
  @Field()
  firstName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @OneToMany(() => Expense, (expense) => expense.user)
  @Field(() => [Expense], { nullable: false })
  expenses: Expense[];
}
