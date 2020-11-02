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
    return newMessage;
}
export default newMessage;
