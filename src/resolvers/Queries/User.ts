import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo} from "graphql/type"

 const User ={
    status: (parent: any,args: any,context: Context,info: GraphQLResolveInfo) =>{
        return context.db.users.findOne({where: {id: parent.id}}).status()
    }
     
}
export default User;