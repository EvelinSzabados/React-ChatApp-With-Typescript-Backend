import { GraphQLResolveFn, User } from '../types'
import { getUserId } from '../../utils';


const newMessage: GraphQLResolveFn = async (parent, args, context, info) => {
    const userId = getUserId(context.request)
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

    if (chatUsers.filter((user: User) => user.id === Object.values(userId)[0]).length > 0) {
        context.pubsub.publish("NEW_MESSAGE", newMessage)
    }

    return newMessage;
}
export default newMessage;
