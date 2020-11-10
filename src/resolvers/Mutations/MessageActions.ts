import { GraphQLResolveFn, User } from '../types'
import { getUserId, validateSubscription } from '../../utils';


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
    let chatUsers = await context.db.chats.findOne({ where: { id: parseInt(args.chatId) } }).users()
    validateSubscription(context, "NEW_MESSAGE", chatUsers, newMessage)


    return newMessage;
}
export default newMessage;
