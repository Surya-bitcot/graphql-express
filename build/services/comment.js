"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class CommentService {
    static async createComment({ content, userId, postId }) {
        if (!userId || !postId) {
            throw new Error("userId and postId are required to create a comment");
        }
        return db_1.prismaClient.comment.create({
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
    static async getCommentsByPostId(postId) {
        return db_1.prismaClient.comment.findMany({
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
    static async getCommentById(id) {
        return db_1.prismaClient.comment.findUnique({
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
    static async updateCommentById({ id, content, userId }) {
        const comment = await db_1.prismaClient.comment.findUnique({ where: { id } });
        if (!comment || comment.userId !== userId) {
            throw new Error("you have not access to update comment");
        }
        return db_1.prismaClient.comment.update({
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
    static async deleteCommentById({ id, userId }) {
        const comment = await db_1.prismaClient.comment.findUnique({ where: { id } });
        if (!comment)
            throw new Error("comment not found");
        await db_1.prismaClient.comment.delete({
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
exports.default = CommentService;
