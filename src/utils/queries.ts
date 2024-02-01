import gql from 'graphql-tag';

export const createUserMutation = gql`
  mutation {
    createUser(
      createUserData: {
        firstName: "fn_test"
        lastName: "ln_test"
        email: "test@test.com"
      }
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const getUsersQuery = gql`
  {
    getUsers {
      id
      email
    }
  }
`;

export const getUsersByIdQuery = gql`
  {
    getUserById(id: 1) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const getExpensesByUserId = gql`
  {
    getExpensesByUserId(userId: 1) {
      expenses {
        id
        name
        total
        user {
          id
          email
        }
      }
      total
    }
  }
`;

export const createExpenseMutation = gql`
  mutation {
    createExpense(
      createExpenseData: {
        user: 1
        name: "book"
        description: "color red"
        total: "2.5"
      }
    ) {
      id
      name
      description
      total
    }
  }
`;

export const deleteExpenseMutation = gql`
  mutation {
    deleteExpense(id: 1) {
      id
      name
      description
      total
    }
  }
`;

export const updateUserEmailMutation = gql`
  mutation {
    updateUserEmail(userEmailData: { userId: 1, email: "testtest@test.com" }) {
      id
      firstName
      lastName
      email
    }
  }
`;
