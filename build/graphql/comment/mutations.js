"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `#graphql
  createComment(content:String!, postId:String!) : Comment
  updateComment(id:String! ,content:String!, postId:String!) : Comment
  deleteComment(id:String!): Boolean
`;
