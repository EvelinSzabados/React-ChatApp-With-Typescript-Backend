import { GraphQLResolveFn } from '../types'

const deleteFriendSubscribe: GraphQLResolveFn = async (parent, args, context, info) => {
    return context.pubsub.asyncIterator("DELETE_FRIEND")
}

const deleteFriend = {
    subscribe: deleteFriendSubscribe,
    resolve: (payload: any) => {
        return payload
    },
}
export default deleteFriend;