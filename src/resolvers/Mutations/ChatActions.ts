import { getUserId } from '../../utils';
import { GraphQLResolveFn } from '../types'

export const newChat: GraphQLResolveFn = (parent, args, context, info) => {
  const userId = getUserId(context.request)
  const newChat = context.db.chats.create({
    data: {
      users: {
        connect: [...args.users.map((id: string) => ({ id: parseInt(id) }))]
      },
      messages: []
    }
  })
  if (args.users.includes(Object.values(userId)[0].toString())) {
    context.pubsub.publish("NEW_CHAT", newChat)
  }

  return newChat;
}

export const deleteChat: GraphQLResolveFn = async (parent, args, context, info) => {
  await context.db.messages.deleteMany({ where: { chatId: parseInt(args.id) } })
  const deletedChat = await context.db.chats.delete({
    where: { id: parseInt(args.id) },
  })
  context.pubsub.publish("DELETE_CHAT", newChat)
  return deletedChat;
}