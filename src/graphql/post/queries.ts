export const queries = `#graphql
    getPostsByUserId(userId: String!): [Post],
    getMyPosts: [Post],
    getAllPosts: [Post]
`