import { GraphQLResolveFn } from '../types'

const newChatSubscribe: GraphQLResolveFn = async (parent, args, context, info) => {
    return context.pubsub.asyncIterator("NEW_CHAT")
}

const newChat = {
    subscribe: newChatSubscribe,
    resolve: (payload: any) => {
        return payload
    },
}
export default newChat;