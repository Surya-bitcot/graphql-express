export const mutations = `#graphql
    createPost(title: String!, description: String!): Post!
    updatePost(id: String!, title: String, description: String): Post
    deletePost(id: String!): Boolean
`;
