import { prismaClient } from "../lib/db";

export interface createPostPayload {
  title: string;
  description: string;
  userId: string;
}

export interface updatePostPayload {
  id: string;
  title?: string;
  description?: string;
  userId: string;
}

export interface deletePostPayload {
  id: string;
  userId: string;
}

class PostService {
  public static async createPost({
    title,
    description,
    userId,
  }: createPostPayload) {
    // console.log('create post serviceeeeeeeeeeeeeeeeeeeee')
    if (!userId) {
      throw new Error("userId is required to create a post");
    }

    return prismaClient.post.create({
      data: {
        title,
        description,
        userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        userId: true,
      },
    });
  }

  public static async getPostsByUserId(userId: string) {
    return prismaClient.post.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        userId: true,
      },
    });
  }

  public static async upadtePostById({
    id,
    title,
    description,
    userId,
  }: updatePostPayload) {
    const post = await prismaClient.post.findUnique({ where: { id } });

    if (!post || post.userId !== userId)
      throw new Error("you are unauthorized you can not access to update post");

    return prismaClient.post.update({
      where: { id },
      data: { title, description },
    });
  }

  public static async deletePostById({ id, userId }: deletePostPayload) {
    const post = await prismaClient.post.findUnique({ where: { id } });
    if (!post || post.userId !== userId)
      throw new Error("you can not delete user you unauthorized");
    await prismaClient.post.delete({ where: { id } });
    return true;
  }

  public static async getAllPosts() {
  const adminUsers = await prismaClient.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true },
  });

  const adminUserIds = adminUsers.map((user) => user.id);

  const post = await prismaClient.post.findMany({
    where: { userId: { in: adminUserIds } },
    include: {
      _count: {
        select: { likes: true },
      },
    },
  });

  return post.map(post => ({
    ...post,
    likeCount: post._count.likes,
  }));
}

}

export default PostService;
