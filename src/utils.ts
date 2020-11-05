import { Context } from 'graphql-yoga/dist/types'
import { verify } from 'jsonwebtoken'

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
    await context.db.users.update(
        {
            where: { id: userId },
            data: {
                friends: {
                    connect: { id: friendId }
                }
            }
        }
    )
}