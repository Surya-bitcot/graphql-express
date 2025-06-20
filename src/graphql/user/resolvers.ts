import UserService, {
  CreateUserPayload,
  GetUserTokenPayload,
  updateUserPayload,
} from "../../services/user";

const queries = {
  getUserToken: async (_: any, payload: { email: string; password: string } ) => {
    const token = await UserService.getUserToken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  },

  getCurrentLoggedInUser: async (_: any, para: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      if (user && user.profileImageURL == null) {
        user.profileImageURL = "";
      }
      return user;
    }
    throw new Error("i dont know who are you");
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },

  updateUser: async (_:any, payload: updateUserPayload, context:any)=> {
    if(!context?.user?.id) throw new Error("unauthorized");
    console.log('Trying to update user:', context.user.id, 'Payload:', payload);
    // Always use logged-in user's id
    return await UserService.updateUserById(context.user.id, payload);
  },

  deleteUser: async(_:any, __:any, context:any)=> {
    if(!context?.user?.id) throw new Error("unauthorized")
      return await UserService.deleteUserById(context.user.id)
  }
};

export const resolvers = { queries, mutations };
