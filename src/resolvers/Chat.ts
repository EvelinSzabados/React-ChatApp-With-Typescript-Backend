import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo} from "graphql/type"

function users(parent: any,args: any,context: Context,info: GraphQLResolveInfo){
    return context.db.chats.findOne({where: {id: parent.id}}).users()
}

function messages(parent: any,args: any,context: Context,info: GraphQLResolveInfo){
    return context.db.chats.findOne({where: {id: parent.id}}).messages()
}

module.exports={users,messages}