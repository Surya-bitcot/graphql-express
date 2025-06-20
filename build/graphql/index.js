"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const user_1 = require("./user");
const post_1 = require("./post");
async function createApolloGraphqlServer() {
    const gqlServer = new server_1.ApolloServer({
        typeDefs: `
      ${user_1.User.typeDef}
      ${post_1.Post.typeDef}

      type Query {
        ${user_1.User.queries}
        ${post_1.Post.queries}
        getContext: String
      }

      type Mutation {
        ${user_1.User.mutations}
        ${post_1.Post.mutations}
      }
    `,
        resolvers: {
            Query: Object.assign(Object.assign(Object.assign({}, user_1.User.resolvers.queries), post_1.Post.resolvers.queries), { getContext: (_, __, context) => {
                    // console.log("context", context);
                    return "Context logged";
                } }),
            Mutation: Object.assign(Object.assign({}, user_1.User.resolvers.mutations), post_1.Post.resolvers.mutations),
        },
    });
    await gqlServer.start();
    return gqlServer;
}
exports.default = createApolloGraphqlServer;
