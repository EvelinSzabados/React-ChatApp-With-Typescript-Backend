import { GraphQLResolveFn } from '../types'
import { getUserId } from '../../utils'

export const sendRequest: GraphQLResolveFn = async (parent, args, context, info) => {
    const userId = getUserId(context.request)

    const request = await context.db.friendRequests.create({
        data: {
            sender: {
                connect: { id: Object.values(userId)[0] },
            },
            reciever: {
                connect: { id: parseInt(args.friendId) },
            },
        }
    })
    return request;
}

export const acceptRequest: GraphQLResolveFn = async (parent, args, context, info) => {
    const userId = getUserId(context.request)
    const requestToAccept = await context.db.friendRequests.findOne({ where: { id: parseInt(args.requestId) } })
    console.log(requestToAccept)
    await context.db.friendRequests.update(
        {
            where: { id: parseInt(args.requestId) },
            data: { status: "ACCEPTED" }
        }

    )
    await context.db.users.update(
        {
            where: { id: Object.values(userId)[0] },
            data: {
                friends: {
                    connect: { id: requestToAccept.senderId }
                }
            }
        }
    )
    await context.db.users.update(
        {
            where: { id: requestToAccept.senderId },
            data: {
                friends: {
                    connect: { id: Object.values(userId)[0] }
                }
            }
        }
    )
    return "Accepted";

}

export const declineRequest: GraphQLResolveFn = async (parent, args, context, info) => {

    await context.db.friendRequests.update(
        {
            where: { id: parseInt(args.requestId) },
            data: { status: "ACCEPTED" }
        }

    )
}
