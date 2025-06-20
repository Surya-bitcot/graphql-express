"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `#graphql
    createPost(title: String!, description: String!): Post!
    updatePost(id: String!, title: String, description: String): Post
    deletePost(id: String!): Boolean
`;
