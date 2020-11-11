import { GraphQLResolveFn } from '../../common/types'
import { getUserId, deleteRequest, addFriend, removeFriend, validateSubscription } from '../../common/utils'


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
        },
        include: {
            sender: true,
            reciever: true
        }
    })

    validateSubscription(context, "NEW_REQUEST", new Array(request.sender, request.reciever), request)
    return request;
}

export const acceptRequest: GraphQLResolveFn = async (parent, args, context, info) => {
    const userId = getUserId(context.request)
    const requestToAccept = await context.db.friendRequests.findOne({ where: { id: parseInt(args.requestId) } })
    deleteRequest(parseInt(args.requestId), context)

    const newFriend = addFriend(Object.values(userId)[0], requestToAccept.senderId, context)
    context.pubsub.publish("ACCEPT_REQUEST", newFriend)
    return newFriend;

}

export const declineRequest: GraphQLResolveFn = async (parent, args, context, info) => {

    const deletedRequest = deleteRequest(parseInt(args.requestId), context)
    context.pubsub.publish("DECLINE_REQUEST", deletedRequest)
}

export const deleteFriend: GraphQLResolveFn = async (parent, args, context, info) => {
    const userId = getUserId(context.request)
    const deletedFriend = removeFriend(Object.values(userId)[0], parseInt(args.friendId), context)
    context.pubsub.publish("DELETE_FRIEND", deletedFriend)

    return deletedFriend;
}

