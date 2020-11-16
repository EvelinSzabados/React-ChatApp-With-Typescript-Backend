import { GraphQLResolveFn } from '../../common/types'

const declineRequestSubscribe: GraphQLResolveFn = async (parent, args, context, info) => {
    return context.pubsub.asyncIterator("DECLINE_REQUEST")
}

const declineRequest = {
    subscribe: declineRequestSubscribe,
    resolve: (payload: any) => {
        return payload
    },
}
export default declineRequest;