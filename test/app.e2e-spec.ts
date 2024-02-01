import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { print } from 'graphql';
import {
  createUserMutation,
  getUsersQuery,
  getUsersByIdQuery,
  getExpensesByUserId,
  createExpenseMutation,
  deleteExpenseMutation,
  updateUserEmailMutation,
} from '../src/utils/queries';

describe('GraphQL Server (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const dataSource = app.get(DataSource);
    await dataSource.synchronize(true);
    await app.init();
  });

  afterAll(async () => {
    const dataSource = app.get(DataSource);
    if (dataSource) {
      await dataSource.dropDatabase();
      await dataSource.destroy();
    }
    await app.close();
  });

  describe('users and expenses', () => {
    it('should query getUsers and return an object getUsers', async () => {
      request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getUsersQuery) })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.getUsers).toHaveLength(0);
        });
    });

    it('should create a user', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(createUserMutation),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser).toEqual({
            id: 1,
            firstName: 'fn_test',
            lastName: 'ln_test',
            email: 'test@test.com',
          });
        });
    });

    it('should query getUsers and return 1 users', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getUsersQuery) })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.getUsers).toHaveLength(1);
        });
    });

    it('should query getUsersById and return userId 1', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getUsersByIdQuery) })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.getUserById).toEqual({
            id: 1,
            firstName: 'fn_test',
            lastName: 'ln_test',
            email: 'test@test.com',
          });
        });
    });

    it('should query getExpensesByUserId and return none', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getExpensesByUserId) })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.getExpensesByUserId.expenses).toHaveLength(0);
          expect(res.body.data.getExpensesByUserId.total).toEqual(0);
        });
    });

    it('should create an expense', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(createExpenseMutation),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createExpense).toEqual({
            id: 1,
            name: 'book',
            description: 'color red',
            total: '2.5',
          });
        });
    });

    it('should query getExpensesByUserId and return one expense after creating it', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getExpensesByUserId) })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.getExpensesByUserId.expenses).toHaveLength(1);
          expect(res.body.data.getExpensesByUserId.total).toEqual(2.5);
        });
    });

    it('should delete an expense', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(deleteExpenseMutation),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.deleteExpense).toEqual({
            id: 1,
            name: 'book',
            description: 'color red',
            total: '2.5',
          });
        });
    });

    it('should query getExpensesByUserId and return none after deleting the expense', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getExpensesByUserId) })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.getExpensesByUserId.expenses).toHaveLength(0);
          expect(res.body.data.getExpensesByUserId.total).toEqual(0);
        });
    });

    it('should update the email of a user', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(updateUserEmailMutation),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.updateUserEmail).toEqual({
            id: 1,
            firstName: 'fn_test',
            lastName: 'ln_test',
            email: 'testtest@test.com',
          });
        });
    });
  });
});
