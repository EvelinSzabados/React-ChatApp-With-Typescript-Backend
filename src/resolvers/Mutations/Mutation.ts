import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo } from "graphql/type"

const Mutation = {
    newChat: (parent: any,{users,messages}: any,context: Context,info: GraphQLResolveInfo) =>{
     
        const newChat = context.db.chats.create({
            data: {
              users:  {
                connect: [...users.map((id: string) => ({ id: parseInt(id) }))]
            },
             messages: {
                connect: [...messages.map((id: string) => ({ id: parseInt(id) }))]
            },
            }
          })
          return newChat;
    }
}

export default Mutation;