import { prismaClient } from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  role?: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

export interface updateUserPayload {
  firstName: string;
  lastName?: string;
  email?: string; // Optional, not used in update
}

class UserService {
  public static async createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password, role } = payload;

    // Generate a salt and hash the password with it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt: salt,
        role: (role as any) || "USER",
      },
    });
  }

  private static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  public static getUserById(id: string) {
    return prismaClient.user.findUnique({where: {id}})
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;

    const user = await UserService.getUserByEmail(email);

    if (!user) throw new Error("user not found");

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) throw new Error("Invalid password");

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30m",
      }
    );


    // console.log(`Token : ${token} \n email : ${user.email} \n id : ${user.id} \n firstname : ${user.role}`)

    return token
  }

  public static decodeJwtToken(token: string){
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }

  public static async updateUserById(id: string, {firstName, lastName}: updateUserPayload) {
     const user = await prismaClient.user.findUnique({where:{id}})
     if(!user) throw new Error('User not found');
     return prismaClient.user.update({
      where:{id},
      data:{
        firstName,
        lastName,
      }
     }) 
  }

  public static async deleteUserById(id: string) {
    const user = await prismaClient.user.findUnique({where:{id}})
    if(!user) throw new Error('User not found');
    await prismaClient.post.deleteMany({ where: { userId: id } });
    await prismaClient.user.delete({where:{id}})
    return true
  }

}

export default UserService;
