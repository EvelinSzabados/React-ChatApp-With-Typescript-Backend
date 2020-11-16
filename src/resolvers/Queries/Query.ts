import { GraphQLFieldResolveFn } from '../../common/types'

const Query: GraphQLFieldResolveFn = {

    chats: async (parent, args, context, info) => {

        const chatsOfCurrentUser = await context.db.chats.findMany({
            where: {
                users: {
                    some: {
                        id: context.userId
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
        const userId = context.userId

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






