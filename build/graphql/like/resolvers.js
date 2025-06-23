"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const like_1 = __importDefault(require("../../services/like"));
const queries = {};
const mutations = {
    doLike: async (_, args, context) => {
        var _a;
        const { postId } = args;
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id))
            throw new Error("Unauthorized");
        if (context.user.role !== "USER")
            throw new Error('only user can like');
        const alreadyLiked = await like_1.default.hasUserLiked({ postId, userId: context.user.id });
        if (alreadyLiked) {
            throw new Error("User has already liked this post");
        }
        return await like_1.default.doLike({ postId, userId: context.user.id });
    }
};
exports.resolvers = { queries, mutations };
