import { GraphQLFieldResolveFn } from '../../common/types'
import { getRelevantFriends, requestsOfCurrentUser } from "../../common/utils"

const Query: GraphQLFieldResolveFn = {

    chats: async (parent, args, context, info) => {

        const chatsOfCurrentUser = await context.db.chats.findMany({
            where: {
                users: {
                    some: {
                        id: context.userId
                    }
                }
            },
            orderBy: { lastUpdated: 'desc' }
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
    currentUser: (parent, args, context, info) => {

        return context.db.users.findOne({ where: { id: context.userId } })
    },
    requests: async (parent, args, context, info) => {
        return await requestsOfCurrentUser(context)
    },
    relevantFriends: async (parent, args, context, info) => {

        const relevantFriends = await getRelevantFriends(context)

        if (relevantFriends.length === 0) {
            return await context.db.$queryRaw`
            SELECT 
            usr2.email,
            usr2.id,
            usr2."displayName",
            usr2.status 
            FROM users 
            RIGHT JOIN "_FriendShip" AS con 
            ON users.id = con."B" 
            JOIN "_FriendShip" AS con2 
            ON con."B" <> con2."B" 
            AND con."A" = con2."A" 
            AND con."B"= 2 
            JOIN users usr2 ON con2."B" = usr2.id LIMIT 5;`
        }

        return relevantFriends;
    }

}
export default Query;






