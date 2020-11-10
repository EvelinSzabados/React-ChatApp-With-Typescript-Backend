import { GraphQLResolveFn } from '../types'

const acceptRequestSubscribe: GraphQLResolveFn = async (parent, args, context, info) => {
    return context.pubsub.asyncIterator("ACCEPT_REQUEST")
}

const acceptRequest = {
    subscribe: acceptRequestSubscribe,
    resolve: (payload: any) => {
        return payload
    },
}
export default acceptRequest;