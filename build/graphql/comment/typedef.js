"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedef = void 0;
exports.typedef = `#graphql
  type Comment {
    id: ID!
    content: String!
    userId: String!
    postId: String!
    createdAt: String!
  }
`;
