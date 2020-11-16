import { GraphQLResolveFn } from '../../common/types'

const sendRequestSubscribe: GraphQLResolveFn = async (parent, args, context, info) => {
    return context.pubsub.asyncIterator("NEW_REQUEST")
}

const newRequest = {
    subscribe: sendRequestSubscribe,
    resolve: (payload: any) => {
        return payload
    },
}
export default newRequest;