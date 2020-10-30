import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo } from "graphql/type"
import { getUserId } from './utils'

export function newChat(parent: any, { users, messages }: any, context: Context, info: GraphQLResolveInfo) {
  const userId = getUserId(context)
  const newChat = context.db.chats.create({
    data: {
      users: {
        connect: [...users.map((id: string) => ({ id: parseInt(id) }))]
      },
      messages: {
        connect: [...messages.map((id: string) => ({ id: parseInt(id) }))]
      },
    }
  })
  return newChat;
}

export async function deleteChat(parent: any, { id }: any, context: Context, info: GraphQLResolveInfo) {

  await context.db.messages.deleteMany({ where: { chatId: parseInt(id) } })
  await context.db.chats.delete({
    where: { id: parseInt(id) },
  })

  return "Deleted"
}