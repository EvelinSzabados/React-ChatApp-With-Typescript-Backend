import { GraphQLResolveFn } from '../../common/types'
import { deleteRequest, addFriend, removeFriend, validateSubscription } from '../../common/utils'


export const sendRequest: GraphQLResolveFn = async (parent, args, context, info) => {

    const request = await context.db.friendRequests.create({
        data: {
            sender: {
                connect: { id: context.userId },
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

    const requestToAccept = await context.db.friendRequests.findOne({ where: { id: parseInt(args.requestId) } })

    const newFriend = addFriend(parseInt(context.userId), requestToAccept.senderId, context)
    context.pubsub.publish("ACCEPT_REQUEST", newFriend)
    deleteRequest(parseInt(args.requestId), context)
    return newFriend;

}

export const declineRequest: GraphQLResolveFn = async (parent, args, context, info) => {

    const deletedRequest = deleteRequest(parseInt(args.requestId), context)
    context.pubsub.publish("DECLINE_REQUEST", deletedRequest)
    return "Declined"
}

export const deleteFriend: GraphQLResolveFn = async (parent, args, context, info) => {

    const deletedFriend = removeFriend(parseInt(context.userId), parseInt(args.friendId), context)
    context.pubsub.publish("DELETE_FRIEND", deletedFriend)

    return deletedFriend;
}

