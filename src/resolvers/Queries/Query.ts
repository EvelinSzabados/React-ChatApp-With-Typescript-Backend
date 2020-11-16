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
    },
    relevantFriends: async (parent, args, context, info) => {
        let relevantFriends = await context.db.$queryRaw`
        SELECT 
        users.id, 
        users.email, 
        users."displayName", 
        users.status, 
        users."profilePictureUrl" 
        FROM chats
        JOIN "_ChatUsers" AS con 
        ON chats.id = con."A"
        JOIN "_ChatUsers" AS con2
        ON con."B" <> con2."B" AND con."A" = con2."A" AND con."B" = ${context.userId}
        JOIN users ON con2."B" = users.id
        WHERE users.id <> ${context.userId} 
        ORDER BY chats."lastUpdated" DESC LIMIT 5;
        `

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
            JOIN users usr2 ON con2."B" = usr2.id;`
        }

        return relevantFriends;
    }

}
export default Query;






