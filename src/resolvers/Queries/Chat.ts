import { GraphQLFieldResolveFn } from '../types'

const Chat: GraphQLFieldResolveFn = {
    users: (parent, args, context, info) => {
        return context.db.chats.findOne({ where: { id: parent.id } }).users()
    },

    messages: (parent, args, context, info) => {
        return context.db.chats.findOne({ where: { id: parent.id } }).messages()
    }
}
export default Chat;




