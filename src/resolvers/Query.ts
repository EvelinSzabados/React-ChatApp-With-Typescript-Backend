import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo } from "graphql/type"

// interface QueryProps {
//     parent: any,
//     args: any,
//     context: Context,
//     info: GraphQLResolveInfo
// }

    export function chats(parent: any,args: any,context: Context,info: GraphQLResolveInfo) {
        
        return context.db.chats.findMany()
    }
    export function chat(parent: any,args: any,context: Context,info: GraphQLResolveInfo) {
        const argsId = parseInt(args.id)
        return context.db.chats.findOne({ where: { id: argsId } })
    }
    
    export function messages(parent: any,args: any,context: Context,info: GraphQLResolveInfo) {
        return context.db.messages.findMany()
    }
    
    export function message(parent: any,args: any,context: Context,info: GraphQLResolveInfo) {
        const argsId = parseInt(args.id)
        return context.db.messages.findOne({ where: { id: argsId } })
    }
    
    export function users(parent: any,args: any,context: Context,info: GraphQLResolveInfo) {
        return context.db.users.findMany()
    }
    
    export function user(parent: any,args: any,context: Context,info: GraphQLResolveInfo) {
        const argsId = parseInt(args.id)
        return context.db.users.findOne({ where: { id: argsId } })
    }




