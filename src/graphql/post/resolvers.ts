import PostService, { createPostPayload } from "../../services/post";
import { prismaClient } from "../../lib/db";

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

  getAllPosts: async (_: any, __: any, context: any) => {
    if (!context?.user?.id) {
      throw new Error("please logged in first");
    }
    
    // if (context.user.role !== "USER") {
    //   throw new Error("Only users with USER role can view admin posts");
    // }

    return PostService.getAllPosts();
  },
};

const mutations = {
  createPost: async (
    _: any,
    args: Omit<createPostPayload, "userId">,
    context: any
  ) => {
    // console.log("create post resolverrrrrrrrrrr")
    if (!context?.user?.id) throw new Error("Unauthorized");
    // console.log('User in context:', context.user); // Debug log
    if (context.user.role !== "ADMIN")
      throw new Error("Only admin can create posts");
    return await PostService.createPost({ ...args, userId: context.user.id });
  },

  updatePost: async (_: any, { id, title, description }: any, context: any) => {
    if (!context?.user?.id) throw new Error("Unauthorized");
    if (context.user.role !== "ADMIN")
      throw new Error("Only admin can update posts");
    return await PostService.upadtePostById({
      id,
      title,
      description,
      userId: context.user.id,
    });
  },

  deletePost: async (_: any, { id }: any, context: any) => {
    if (!context?.user?.id) throw new Error("Unauthorized");
    if (context.user.role !== "ADMIN")
      throw new Error("Only admin can delete posts");
    return await PostService.deletePostById({ id, userId: context.user.id });
  },
};

const resolvers = {
  queries,
  mutations,
};

export { resolvers };
