import CommentService from "../../services/comment"

const queries = {
    getCommentsByPostId : async(_:any,args:{postId:string}, context:any)=> {
        const {postId} = args
        if(!context?.user?.id) throw new Error("Unauthorized")
        return await CommentService.getCommentsByPostId(postId)  
    },


    getCommentById: async(_:any, args:{id:string}, context:any) => {
        const {id} = args
        if(!context?.user?.id) throw new Error("unauthorized")
        return await CommentService.getCommentById(id)
    }
}

const mutation = {
   createComment: async(_:any, args: {content:string, postId:string}, context:any)=>{
     const {content, postId} = args

     if(!context?.user?.id) throw new Error("unauthorized")

     return await CommentService.createComment({content, postId, userId: context.user.id})   
   },

   updateComment: async (_:any, args:{id:string, content:string, postId:string}, context:any)=> {
      const {id, content, postId} = args

      if(!context?.user?.id) throw new Error("unauthorized")

      return await CommentService.updateCommentById({
        id,content, userId:context.user.id
      })
   },

   deleteComment: async (_:any, args:{id:string},context:any)=> {
    const {id} = args
    if(!context?.user?.id) throw new Error("Unauthorized")
    return await CommentService.deleteCommentById({id,userId:context.user.id})
   }
}

export const resolvers = {queries, mutation}