export const mutations = `#graphql
  createUser(firstName: String!, lastName: String!, email: String!, password: String!, role: String): String
  updateUser(firstName: String!, lastName: String!): User
  deleteUser: Boolean
`;
