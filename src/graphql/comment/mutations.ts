export const mutations = `#graphql
  createComment(content:String!, postId:String!) : Comment
  updateComment(id:String! ,content:String!, postId:String!) : Comment
  deleteComment(id:String!): Boolean
`