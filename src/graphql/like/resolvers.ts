import LikeService from "../../services/like";

const queries = {}

const mutations = {
    doLike: async (_: any, args: { postId: string }, context: any) => {
        const { postId } = args;
        if (!context?.user?.id) throw new Error("Unauthorized");
        if (context.user.role !== "USER") throw new Error('only user can like');

        const alreadyLiked = await LikeService.hasUserLiked({ postId, userId: context.user.id });
        if (alreadyLiked) {
            throw new Error("User has already liked this post");
        }

        return await LikeService.doLike({ postId, userId: context.user.id });
    }
}

export const resolvers = { queries, mutations };