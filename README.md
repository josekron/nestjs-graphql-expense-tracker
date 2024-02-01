### Description

Expense Tracker GraphQL API that allows to create users, and add and delete expenses.

I noticed that you can only find the same basic examples on the internet when you search for graphQL or PostgreSQL, and you can even forget to find something with both technologies running together. 

Therefore, I created this repository with the purpose of having a **full backend application (almost) ready for production, using some of the most in-demand technologies** such as **GraphQL** and **PostgreSQL**, and everything running on **Docker-compose**. 

## Technologies

- NestJs + Typescript
- Apollo GraphQL
- PostgreSQL + ORM TypeORM
- E2E Tests with Jest
- Docker-compose to run the app and the database

> **Note:** `vitest` has an [unsolved issue](https://github.com/vitejs/vite/issues/7879) with supertest + GraphQL. Therefore, I replaced vitest with Jest.

## How to run it

- Run `docker-compose up --build`

- If you want to use your PostgreSQL running on your machine: `npm install` & `npm run start:dev`

## Testing

- Run `npm run test:e2e`

- Run the app and go to `http://localhost:3000/graphql` and try the following queries:

- **Get User by Id**:

```
query {
    getUserById(id:1) {
      id
      email,
      expenses {
        name,
        total
      }
    }
}
```

- **Create User**:

```
mutation{createUser(createUserData: {firstName: "Test2", lastName: "Test2", email: "test2@test.com"}){
    id
    firstName,
    email
}}
```

- **Update User Email**:

```
mutation{updateUserEmail(userEmailData: {userId: 1, email: "test3@test.com"}){
    id
    firstName,
    email
}}
```

- **Get All users**:

```
query {
    getUsers {
      id
      email,
      expenses {
        name,
        total
      }
    }
}
```

- **Get Expenses by User ID**:

```
query {
    getExpensesByUserId(userId:1) {
      expenses {
        id
        name
        total
        user{
          id
          email
        }
      }
    	total
    }
}
```

- **Create Expense**:

```
mutation{createExpense(createExpenseData: {user: 1, name: "book", description: "color red", total: "3.5"}){
    id
    name,
    description,
  	total
}}
```

- **Delete Expense**:

```
mutation{deleteExpense(id: 1){
    id
    name,
    description,
  	total,
  	user {
      id
    }
}}
```

## Documentation

- **NestJs + Apollo**: https://docs.nestjs.com/graphql/quick-start
- **GraphQL**: https://graphql.org/learn/
