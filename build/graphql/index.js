"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const user_1 = require("./user");
const post_1 = require("./post");
const like_1 = require("./like");
const comment_1 = require("./comment");
async function createApolloGraphqlServer() {
    const gqlServer = new server_1.ApolloServer({
        typeDefs: `
      ${user_1.User.typeDef}
      ${post_1.Post.typeDef}
      ${like_1.Like.typeDef}
      ${comment_1.Comment.typedef}

      type Query {
        ${user_1.User.queries}
        ${post_1.Post.queries}
        ${like_1.Like.queries}
        ${comment_1.Comment.queries}
        getContext: String
      }

      type Mutation {
        ${user_1.User.mutations}
        ${post_1.Post.mutations}
        ${like_1.Like.mutations}
        ${comment_1.Comment.mutations}
      }
    `,
        resolvers: {
            Query: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, user_1.User.resolvers.queries), post_1.Post.resolvers.queries), like_1.Like.resolvers.queries), comment_1.Comment.resolvers.queries), { getContext: (_, __, context) => {
                    // console.log("context", context);
                    return "Context logged";
                } }),
            Mutation: Object.assign(Object.assign(Object.assign(Object.assign({}, user_1.User.resolvers.mutations), post_1.Post.resolvers.mutations), like_1.Like.resolvers.mutations), comment_1.Comment.resolvers.mutation),
        },
    });
    await gqlServer.start();
    return gqlServer;
}
exports.default = createApolloGraphqlServer;
