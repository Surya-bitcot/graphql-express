"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class UserService {
    static async createUser(payload) {
        const { firstName, lastName, email, password, role } = payload;
        // Generate a salt and hash the password with it
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        return db_1.prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                salt: salt,
                role: role || "USER",
            },
        });
    }
    static getUserByEmail(email) {
        return db_1.prismaClient.user.findUnique({ where: { email } });
    }
    static getUserById(id) {
        return db_1.prismaClient.user.findUnique({ where: { id } });
    }
    static async getUserToken(payload) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);
        if (!user)
            throw new Error("user not found");
        const matchPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!matchPassword)
            throw new Error("Invalid password");
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, {
            expiresIn: "30m",
        });
        // console.log(`Token : ${token} \n email : ${user.email} \n id : ${user.id} \n firstname : ${user.role}`)
        return token;
    }
    static decodeJwtToken(token) {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    static async updateUserById(id, { firstName, lastName }) {
        const user = await db_1.prismaClient.user.findUnique({ where: { id } });
        if (!user)
            throw new Error('User not found');
        return db_1.prismaClient.user.update({
            where: { id },
            data: {
                firstName,
                lastName,
            }
        });
    }
    static async deleteUserById(id) {
        const user = await db_1.prismaClient.user.findUnique({ where: { id } });
        if (!user)
            throw new Error('User not found');
        await db_1.prismaClient.post.deleteMany({ where: { userId: id } });
        await db_1.prismaClient.user.delete({ where: { id } });
        return true;
    }
}
exports.default = UserService;
