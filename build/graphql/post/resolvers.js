"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const post_1 = __importDefault(require("../../services/post"));
const queries = {
    getPostsByUserId: async (_, { userId }) => {
        const posts = await post_1.default.getPostsByUserId(userId);
        // console.log("Fetched posts:", posts); // Add this log
        return posts;
    },
    getMyPosts: async (_, __, context) => {
        var _a;
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new Error("please logged in first");
        }
        return post_1.default.getPostsByUserId(context.user.id);
    },
    getAllPosts: async (_, __, context) => {
        var _a;
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new Error("please logged in first");
        }
        // if (context.user.role !== "USER") {
        //   throw new Error("Only users with USER role can view admin posts");
        // }
        return post_1.default.getAllPosts();
    },
};
const mutations = {
    createPost: async (_, args, context) => {
        var _a;
        // console.log("create post resolverrrrrrrrrrr")
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id))
            throw new Error("Unauthorized");
        // console.log('User in context:', context.user); // Debug log
        if (context.user.role !== "ADMIN")
            throw new Error("Only admin can create posts");
        return await post_1.default.createPost(Object.assign(Object.assign({}, args), { userId: context.user.id }));
    },
    updatePost: async (_, { id, title, description }, context) => {
        var _a;
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id))
            throw new Error("Unauthorized");
        if (context.user.role !== "ADMIN")
            throw new Error("Only admin can update posts");
        return await post_1.default.upadtePostById({
            id,
            title,
            description,
            userId: context.user.id,
        });
    },
    deletePost: async (_, { id }, context) => {
        var _a;
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id))
            throw new Error("Unauthorized");
        if (context.user.role !== "ADMIN")
            throw new Error("Only admin can delete posts");
        return await post_1.default.deletePostById({ id, userId: context.user.id });
    },
};
const resolvers = {
    queries,
    mutations,
};
exports.resolvers = resolvers;
