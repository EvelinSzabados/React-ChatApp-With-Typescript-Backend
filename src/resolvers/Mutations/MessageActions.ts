import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo } from "graphql/type"

export async function newMessage(parent: any,{senderId,chatId,text}: any,context: Context,info: GraphQLResolveInfo){
    const newMessage = await context.db.messages.create({
        data: {
            sender: {
                connect: {id: parseInt(senderId)},
              },
              chat: {
                  connect: { id: parseInt(chatId)}
              },
              text: text
        }
      })
      return newMessage;
}