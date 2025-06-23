import { prismaClient } from "../lib/db";

export interface LikePayload {
    userId: string;
    postId: string;
}



class LikeService {
    public static async doLike ({userId, postId}: LikePayload) {

        if(!postId){
            throw new Error('postId is required')
        }

        return prismaClient.like.create({
            data: {
                userId,
                postId
            }
        })
    }

    public static async hasUserLiked({ userId, postId }: LikePayload): Promise<boolean> {
    if (!postId || !userId) {
        throw new Error('userId and postId are required');
    }

    const like = await prismaClient.like.findFirst({
        where: {
            userId,
            postId
        }
    });

    return !!like;
}

}
 


export default LikeService;