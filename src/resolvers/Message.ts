import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo} from "graphql/type"

function sender(parent: any,args: any,context: Context,info: GraphQLResolveInfo){
    return context.db.messages.findOne({where: {id: parent.id}}).sender()
}

module.exports={sender}