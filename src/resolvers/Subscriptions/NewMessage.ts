import { GraphQLResolveFn } from '../types'

const newMessageSubscription: GraphQLResolveFn = async (parent, args, context, info) => {
    return context.pubsub.asyncIterator("NEW_MESSAGE")
}

const newMessage = {
    subscribe: newMessageSubscription,
    resolve: (payload: any) => {
        return payload
    },
}
export default newMessage;