import { Context } from 'graphql-yoga/dist/types'
import { verify } from 'jsonwebtoken'
import { User } from './resolvers/types'

export const APP_SECRET = 'k-i-n-s-t-a'

export function getUserId(req: any) {
    const Authorization = req.get('Cookie')

    if (Authorization) {
        const token = Authorization.replace('Bearer=', '')

        const userId = verify(token, APP_SECRET)

        return userId;

    }

    throw new Error("Not authenticated")
}
export const deleteRequest = async (requestId: number, context: Context) => {
    await context.db.friendRequests.delete(
        {
            where: { id: requestId }
        }

    )
}

export const addFriend = async (userId: number, friendId: number, context: Context) => {

    await context.db.friendships.create({
        data: {
            users: {
                connect: [{ id: userId }, { id: friendId }]
            }
        }
    })
}

export const removeFriend = async (userId: number, friendId: number, context: Context) => {

    await context.db.friendships.deleteMany({
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


}

export const validateSubscription = async (context: Context, subName: string, users: User[], toPublish: any) => {
    const userId = getUserId(context.request)
    if (users.filter((user: User) => user.id === Object.values(userId)[0]).length > 0) {
        context.pubsub.publish(subName, toPublish)
    }
}