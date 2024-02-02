import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsDate } from 'class-validator';
import { User } from '../user/user.entity';

@Entity({ name: 'user_expenses' })
@ObjectType()
export class Expense {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ nullable: false })
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ type: 'real', default: 0, nullable: false })
  @Field()
  total: string;

  @ManyToOne(() => User, (user) => user.expenses)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;
}
