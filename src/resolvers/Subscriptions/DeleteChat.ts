import { GraphQLResolveFn } from '../../common/types'

const deleteChatSubscribe: GraphQLResolveFn = async (parent, args, context, info) => {
    return context.pubsub.asyncIterator("DELETE_CHAT")
}

const deleteChat = {
    subscribe: deleteChatSubscribe,
    resolve: (payload: any) => {
        return payload
    },
}
export default deleteChat;