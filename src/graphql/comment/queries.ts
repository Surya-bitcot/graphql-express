export const queries = `#graphql
   getCommentsByPostId(postId: String!): [Comment],
   getCommentById(id: String!): Comment
`