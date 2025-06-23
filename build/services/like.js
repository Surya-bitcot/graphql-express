"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class LikeService {
    static async doLike({ userId, postId }) {
        if (!postId) {
            throw new Error('postId is required');
        }
        return db_1.prismaClient.like.create({
            data: {
                userId,
                postId
            }
        });
    }
    static async hasUserLiked({ userId, postId }) {
        if (!postId || !userId) {
            throw new Error('userId and postId are required');
        }
        const like = await db_1.prismaClient.like.findFirst({
            where: {
                userId,
                postId
            }
        });
        return !!like;
    }
}
exports.default = LikeService;
