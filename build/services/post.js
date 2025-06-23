"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class PostService {
    static async createPost({ title, description, userId }) {
        // console.log('create post serviceeeeeeeeeeeeeeeeeeeee')
        if (!userId) {
            throw new Error("userId is required to create a post");
        }
        return db_1.prismaClient.post.create({
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
    static async getPostsByUserId(userId) {
        return db_1.prismaClient.post.findMany({
            where: { userId },
        });
    }
    static async upadtePostById({ id, title, description, userId }) {
        const post = await db_1.prismaClient.post.findUnique({ where: { id } });
        if (!post || post.userId !== userId)
            throw new Error("you are unauthorized you can not access to update post");
        return db_1.prismaClient.post.update({
            where: { id },
            data: { title, description }
        });
    }
    static async deletePostById({ id, userId }) {
        const post = await db_1.prismaClient.post.findUnique({ where: { id } });
        if (!post || post.userId !== userId)
            throw new Error("you can not delete user you unauthorized");
        await db_1.prismaClient.post.delete({ where: { id } });
        return true;
    }
    static async getAllAdminPosts() {
        const adminUsers = await db_1.prismaClient.user.findMany({
            where: { role: "ADMIN" },
            select: { id: true },
        });
        const adminUserIds = adminUsers.map((user) => user.id);
        return db_1.prismaClient.post.findMany({
            where: { userId: { in: adminUserIds } },
        });
    }
}
exports.default = PostService;
