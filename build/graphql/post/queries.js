"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
    getPostsByUserId(userId: String!): [Post],
    getMyPosts: [Post]
`;
