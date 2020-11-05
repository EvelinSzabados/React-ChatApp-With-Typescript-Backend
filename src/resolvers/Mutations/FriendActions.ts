import { GraphQLResolveFn } from '../types'
import { getUserId, deleteRequest, addFriend, removeFriend } from '../../utils'


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
    deleteRequest(parseInt(args.requestId), context)

    addFriend(Object.values(userId)[0], requestToAccept.senderId, context)

    return "Accepted";

}

export const declineRequest: GraphQLResolveFn = async (parent, args, context, info) => {

    deleteRequest(parseInt(args.requestId), context)
}

export const deleteFriend: GraphQLResolveFn = async (parent, args, context, info) => {
    const userId = getUserId(context.request)
    removeFriend(Object.values(userId)[0], parseInt(args.friendId), context)

    return "Friend deleted"
}

