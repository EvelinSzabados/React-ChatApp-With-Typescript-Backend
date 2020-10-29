import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo} from "graphql/type"

function status(parent: any,args: any,context: Context,info: GraphQLResolveInfo){
    return context.db.users.findOne({where: {id: parent.id}}).status()
}


module.exports={status}