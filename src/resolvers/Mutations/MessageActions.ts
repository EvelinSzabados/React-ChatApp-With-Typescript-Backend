import { GraphQLResolveFn, User } from '../../common/types'
import { validateSubscription } from '../../common/utils';


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
    await context.db.chats.update({
        where: { id: parseInt(args.chatId) },
        data: { lastUpdated: new Date() },
    })

    let chatUsers = await context.db.chats.findOne({ where: { id: parseInt(args.chatId) } }).users()
    validateSubscription(context, "NEW_MESSAGE", chatUsers, newMessage)


    return newMessage;
}
export default newMessage;
