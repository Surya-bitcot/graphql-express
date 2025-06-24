import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Post } from "./post";
import { Like } from "./like";
import { Comment } from "./comment";

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
      ${User.typeDef}
      ${Post.typeDef}
      ${Like.typeDef}
      ${Comment.typedef}

      type Query {
        ${User.queries}
        ${Post.queries}
        ${Like.queries}
        ${Comment.queries}
        getContext: String
      }

      type Mutation {
        ${User.mutations}
        ${Post.mutations}
        ${Like.mutations}
        ${Comment.mutations}
      }
    `,
    resolvers: {
  Query: {
    ...User.resolvers.queries,
    ...Post.resolvers.queries,
    ...Like.resolvers.queries,
    ...Comment.resolvers.queries,
    getContext: (_: any, __: any, context: any) => {
      // console.log("context", context);
      return "Context logged";
    },
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Post.resolvers.mutations,
    ...Like.resolvers.mutations,
    ...Comment.resolvers.mutation
  },
},
  });

  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
