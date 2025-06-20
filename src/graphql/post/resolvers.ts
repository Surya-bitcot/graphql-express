import PostService, { createPostPayload } from "../../services/post";

const queries = {
  getPostsByUserId: async (_: any, { userId }: { userId: string }) => {
    const posts = await PostService.getPostsByUserId(userId);
    // console.log("Fetched posts:", posts); // Add this log
    return posts;
  },

  getMyPosts: async (_: any, __: any, context: any) => {
    if (!context?.user?.id) {
      throw new Error("please logged in first");
    }

    return PostService.getPostsByUserId(context.user.id);
  },
};

const mutations = {
  createPost: async (_: any, args: Omit<createPostPayload, "userId">, context: any) => {
    if (!context?.user?.id) throw new Error("Unauthorized");
    // Inject userId from context
    return await PostService.createPost({ ...args, userId: context.user.id });
  },

   updatePost: async (_: any, { id, title, description }: any, context: any) => {
        if (!context?.user?.id) throw new Error("Unauthorized");
        return await PostService.upadtePostById({ id, title, description, userId: context.user.id });
    },

    deletePost: async (_: any, { id }: any, context: any) => {
        if (!context?.user?.id) throw new Error("Unauthorized");
        return await PostService.deletePostById({ id, userId: context.user.id });
    }
};

export const resolvers = { queries, mutations };
