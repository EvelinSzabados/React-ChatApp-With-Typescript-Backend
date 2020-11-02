import { GraphQLFieldResolveFn } from '../types'
import { getUserId } from '../../utils'

const Query: GraphQLFieldResolveFn = {

    chats: (parent, args, context, info) => {
        getUserId(context.request)
        return context.db.chats.findMany()
    },
    chat: (parent, args, context, info) => {
        const argsId = parseInt(args.id)
        return context.db.chats.findOne({ where: { id: argsId } })
    },

    users: (parent, args, context, info) => {
        return context.db.users.findMany()
    },

    user: (parent, args, context, info) => {
        const argsId = parseInt(args.id)
        return context.db.users.findOne({ where: { id: argsId } })
    }

}
export default Query;






