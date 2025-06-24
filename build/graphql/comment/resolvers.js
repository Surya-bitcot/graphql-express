"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const comment_1 = __importDefault(require("../../services/comment"));
const queries = {
    getCommentsByPostId: async (_, args, context) => {
        var _a;
        const { postId } = args;
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id))
            throw new Error("Unauthorized");
        return await comment_1.default.getCommentsByPostId(postId);
    },
    getCommentById: async (_, args, context) => {
        var _a;
        const { id } = args;
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id))
            throw new Error("unauthorized");
        return await comment_1.default.getCommentById(id);
    }
};
const mutation = {
    createComment: async (_, args, context) => {
        var _a;
        const { content, postId } = args;
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id))
            throw new Error("unauthorized");
        return await comment_1.default.createComment({ content, postId, userId: context.user.id });
    },
    updateComment: async (_, args, context) => {
        var _a;
        const { id, content, postId } = args;
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id))
            throw new Error("unauthorized");
        return await comment_1.default.updateCommentById({
            id, content, userId: context.user.id
        });
    },
    deleteComment: async (_, args, context) => {
        var _a;
        const { id } = args;
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id))
            throw new Error("Unauthorized");
        return await comment_1.default.deleteCommentById({ id, userId: context.user.id });
    }
};
exports.resolvers = { queries, mutation };
