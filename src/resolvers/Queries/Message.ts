import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo} from "graphql/type"

 const Message ={
    sender: (parent: any,args: any,context: Context,info: GraphQLResolveInfo) =>{
        return context.db.messages.findOne({where: {id: parent.id}}).sender()
    }
    
    
}
export default Message;