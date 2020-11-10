import { GraphQLResolveFn } from '../types'

const newMessage: GraphQLResolveFn = async (parent, args, context, info) => {
    const newMessage = await context.db.messages.create({
        data: {
            sender: {
                connect: { id: parseInt(args.senderId) },
            },
            chat: {
                connect: { id: parseInt(args.chatId) }
            },
            text: args.text
        }
    })
    context.pubsub.publish("NEW_MESSAGE", newMessage)
    return newMessage;
}
export default newMessage;
