"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = __importDefault(require("../../services/user"));
const queries = {
    getUserToken: async (_, payload) => {
        const token = await user_1.default.getUserToken({
            email: payload.email,
            password: payload.password,
        });
        return token;
    },
    getCurrentLoggedInUser: async (_, para, context) => {
        if (context && context.user) {
            const id = context.user.id;
            const user = await user_1.default.getUserById(id);
            if (user && user.profileImageURL == null) {
                user.profileImageURL = "";
            }
            return user;
        }
        throw new Error("i dont know who are you");
    },
};
const mutations = {
    createUser: async (_, payload) => {
        const res = await user_1.default.createUser(payload);
        return res.id;
    },
    updateUser: async (_, payload, context) => {
        var _a;
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id))
            throw new Error("unauthorized");
        console.log('Trying to update user:', context.user.id, 'Payload:', payload);
        // Always use logged-in user's id
        return await user_1.default.updateUserById(context.user.id, payload);
    },
    deleteUser: async (_, __, context) => {
        var _a;
        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id))
            throw new Error("unauthorized");
        return await user_1.default.deleteUserById(context.user.id);
    }
};
exports.resolvers = { queries, mutations };
