import { prismaClient } from "../lib/db";

export interface CreateCommentPayload {
  content: string;
  userId: string;
  postId: string;
}

export interface UpdateCommentPayload {
  id: string;
  content?: string;
  userId: string;
}

export interface DeleteCommentPayload {
  id: string;
  userId: string;
}

class CommentService {
  public static async createComment({ content, userId, postId }: CreateCommentPayload) {
    if (!userId || !postId) {
      throw new Error("userId and postId are required to create a comment");
    }
    return prismaClient.comment.create({
      data: {
        content,
        userId,
        postId,
      },
      select: {
        id: true,
        content: true,
        userId: true,
        postId: true,
        createdAt: true,
      },
    });
  }

  public static async getCommentsByPostId(postId: string) {
    return prismaClient.comment.findMany({
      where: { postId },
      select: {
        id: true,
        content: true,
        userId: true,
        postId: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  public static async getCommentById(id: string) {
    return prismaClient.comment.findUnique({
      where: { id },
      select: {
        id: true,
        content: true,
        userId: true,
        postId: true,
        createdAt: true,
      },
    });
  }

  public static async updateCommentById({ id, content, userId }: UpdateCommentPayload) {
   
    const comment = await prismaClient.comment.findUnique({where:{id}})

    if(!comment || comment.userId !== userId) {
        throw new Error("you have not access to update comment")
    }
  
    return prismaClient.comment.update({
      where: { id },
      data: { content },
      select: {
        id: true,
        content: true,
        userId: true,
        postId: true,
        createdAt: true,
      },
    });
  }

  public static async deleteCommentById({ id, userId }: DeleteCommentPayload) {
    
     const comment = await prismaClient.comment.findUnique({where:{id}})

     if(!comment) throw new Error("comment not found")

    await prismaClient.comment.delete({
      where: { id },
      select: {
        id: true,
        content: true,
        userId: true,
        postId: true,
        createdAt: true,
      },
    });
    return true;
  }
}

export default CommentService;
