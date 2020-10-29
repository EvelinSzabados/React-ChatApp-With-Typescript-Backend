import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo} from "graphql/type"

 const Chat ={
    users: (parent: any,args: any,context: Context,info: GraphQLResolveInfo) => {
        return context.db.chats.findOne({where: {id: parent.id}}).users()
    },
    
    messages: (parent: any,args: any,context: Context,info: GraphQLResolveInfo) =>{
        return context.db.chats.findOne({where: {id: parent.id}}).messages()
    }
}
export default Chat;




