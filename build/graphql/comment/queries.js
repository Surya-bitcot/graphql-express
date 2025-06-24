"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
   getCommentsByPostId(postId: String!): [Comment],
   getCommentById(id: String!): Comment
`;
