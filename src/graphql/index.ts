import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Post } from "./post";

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
      ${User.typeDef}
      ${Post.typeDef}

      type Query {
        ${User.queries}
        ${Post.queries}
        getContext: String
      }

      type Mutation {
        ${User.mutations}
        ${Post.mutations}
      }
    `,
    resolvers: {
  Query: {
    ...User.resolvers.queries,
    ...Post.resolvers.queries, // <-- Add this line!
    getContext: (_: any, __: any, context: any) => {
      // console.log("context", context);
      return "Context logged";
    },
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Post.resolvers.mutations,
  },
},
  });

  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
