"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = void 0;
exports.typeDef = `#graphql
    type Post {
        id: ID!
        title: String!
        description: String!
        userId: String!
        likeCount: Int!
    }
`;
