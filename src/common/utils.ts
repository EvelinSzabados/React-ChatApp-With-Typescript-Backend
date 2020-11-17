import { Context } from 'graphql-yoga/dist/types'
import { verify } from 'jsonwebtoken'
import { User } from './types'

export const APP_SECRET = 'k-i-n-s-t-a'

export function getUserId(req: any) {

    const Authorization = req.get("Cookie")

    if (Authorization) {
        const token = Authorization.replace('Bearer=', '')
        if (token) {
            const userId = verify(token, APP_SECRET)

            return userId;
        }
    }

    return "Not authenticated";
}
export const deleteRequest = async (requestId: number, context: Context) => {
    const deletedRequest = await context.db.friendRequests.delete(
        {
            where: { id: requestId }
        }

    )
    return deletedRequest;
}

export const addFriend = async (userId: number, friendId: number, context: Context) => {

    const friend = await context.db.friendships.create({
        data: {
            users: {
                connect: [{ id: userId }, { id: friendId }]
            }
        },
        include: {
            users: true
        }
    })

    return friend;
}

export const removeFriend = async (userId: number, friendId: number, context: Context) => {

    const deletedFriend = await context.db.friendships.deleteMany({
        where: {
            AND: [
                {
                    users: {
                        some: {
                            id: userId
                        }
                    },

                }, {

                    users: {
                        some: {
                            id: friendId
                        }
                    }

                }]
        }
    })
    return deletedFriend;


}

export const validateSubscription = async (context: Context, subName: string, users: User[], toPublish: any) => {

    if (users.filter((user: User) => user.id === parseInt(context.userId)).length > 0) {
        context.pubsub.publish(subName, toPublish)
    }
}

export const getRelevantFriends = (context: Context) => {
    let relevantFriends = context.db.$queryRaw`
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
        ORDER BY chats."lastUpdated" DESC LIMIT 5;`
    return relevantFriends
}

export const requestsOfCurrentUser = (context: Context) => {
    return context.db.friendRequests.findMany({
        where: {
            OR: [
                {
                    sender: {
                        id: {
                            equals: context.userID
                        }
                    }
                },
                {
                    reciever: {
                        id: {
                            equals: context.userId
                        }

                    }
                }
            ]
        }
    })
}