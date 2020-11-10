import { validateSubscription } from '../../utils';
import { GraphQLResolveFn } from '../types'

export const newChat: GraphQLResolveFn = async (parent, args, context, info) => {

  const newChat = await context.db.chats.create({
    data: {
      users: {
        connect: [...args.users.map((id: string) => ({ id: parseInt(id) }))]
      },
      messages: []
    },
    include: {
      users: true
    }
  })
  validateSubscription(context, "NEW_CHAT", newChat.users, newChat)


  return newChat;
}

export const deleteChat: GraphQLResolveFn = async (parent, args, context, info) => {
  await context.db.messages.deleteMany({ where: { chatId: parseInt(args.id) } })
  const deletedChat = await context.db.chats.delete({
    where: { id: parseInt(args.id) },
    include: {
      users: true
    }
  })
  validateSubscription(context, "DELETE_CHAT", deletedChat.users, deletedChat)

  return deletedChat;
}