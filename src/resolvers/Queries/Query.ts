import { GraphQLFieldResolveFn } from '../../common/types'
import { getUserId } from '../../common/utils'


const Query: GraphQLFieldResolveFn = {

    chats: async (parent, args, context, info) => {
        // const userId = getUserId(context.request)

        const chatsOfCurrentUser = await context.db.chats.findMany({
            where: {
                users: {
                    some: {
                        id: Object.values(context.userId)[0]
                        // id: context.userId
                    }
                }
            }
        })
        return chatsOfCurrentUser;
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
    },
    requests: async (parent, args, context, info) => {
        const userId = Object.values(getUserId(context.request))[0].toString()

        const requestsOfCurrentUser = await context.db.friendRequests.findMany({
            where: {
                OR: [
                    {
                        sender: {
                            id: {
                                equals: parseInt(userId)
                            }
                        }
                    },
                    {
                        reciever: {
                            id: {
                                equals: parseInt(userId)
                            }

                        }
                    }
                ]
            }
        })
        return requestsOfCurrentUser;
    }

}
export default Query;






