import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo } from "graphql/type"

const Query ={
    chats : (parent: any,args: any,context: Context,info: GraphQLResolveInfo) => {
        
        return context.db.chats.findMany()
    },
    chat: (parent: any,args: any,context: Context,info: GraphQLResolveInfo) => {
        const argsId = parseInt(args.id)
        return context.db.chats.findOne({ where: { id: argsId } })
    },
    
    messages: (parent: any,args: any,context: Context,info: GraphQLResolveInfo)=> {
        return context.db.messages.findMany()
    },
    
    message: (parent: any,args: any,context: Context,info: GraphQLResolveInfo)=> {
        const argsId = parseInt(args.id)
        return context.db.messages.findOne({ where: { id: argsId } })
    },
    
    users: (parent: any,args: any,context: Context,info: GraphQLResolveInfo)=> {
        return context.db.users.findMany()
    },
    
    user: (parent: any,args: any,context: Context,info: GraphQLResolveInfo) =>{
        const argsId = parseInt(args.id)
        return context.db.users.findOne({ where: { id: argsId } })
    }
     
}
export default Query;

   




