"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `#graphql
  createUser(firstName: String!, lastName: String!, email: String!, password: String!, role: String): String
  updateUser(firstName: String!, lastName: String!): User
  deleteUser: Boolean
`;
