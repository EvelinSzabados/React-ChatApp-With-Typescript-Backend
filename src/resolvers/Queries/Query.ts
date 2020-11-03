import { GraphQLFieldResolveFn } from '../types'
import { getUserId } from '../../utils'
import { UsersDistinctFieldEnum } from '@prisma/client'

const Query: GraphQLFieldResolveFn = {

    chats: async (parent, args, context, info) => {
        const userId = getUserId(context.request)

        const result = await context.db.chats.findMany({
            where: {
                users: {
                    some: {
                        id: Object.values(userId)[0]
                    }
                }
            }
        })
        return result;
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






