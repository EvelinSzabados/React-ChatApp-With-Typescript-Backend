import { getUserId } from '../../utils';
import { GraphQLResolveFn } from '../types'

export const newChat: GraphQLResolveFn = (parent, args, context, info) => {
  getUserId(context.request)
  const newChat = context.db.chats.create({
    data: {
      users: {
        connect: [...args.users.map((id: string) => ({ id: parseInt(id) }))]
      },
      messages: []
    }
  })
  context.pubsub.publish("NEW_CHAT", newChat)
  return newChat;
}

export const deleteChat: GraphQLResolveFn = async (parent, args, context, info) => {
  await context.db.messages.deleteMany({ where: { chatId: parseInt(args.id) } })
  await context.db.chats.delete({
    where: { id: parseInt(args.id) },
  })

  return "Deleted"
}