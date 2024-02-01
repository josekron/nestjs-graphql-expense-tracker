import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Expense } from './expense/expense.entity';
import { UserModule } from './user/users.module';
import { ExpenseModule } from './expense/expense.module';
import 'dotenv/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: [User, Expense],
      synchronize: true,
      logging: false,
    }),
    UserModule,
    ExpenseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
