import { GraphQLResolveFn } from '../types'

const setStatusSubscribe: GraphQLResolveFn = async (parent, args, context, info) => {
    return context.pubsub.asyncIterator("SET_STATUS")
}

const setStatus = {
    subscribe: setStatusSubscribe,
    resolve: (payload: any) => {
        return payload
    },
}
export default setStatus;