import { GraphQLResolveFn } from '../../common/types'
import { getUserId } from '../../common/utils'

const setStatus: GraphQLResolveFn = async (parent, args, context, info) => {
    const userId = getUserId(context.request)

    const newStatusUser = context.db.users.update({
        where: {
            id: Object.values(userId)[0]
        },
        data: {
            status: args.statusName
        }
    })
    context.pubsub.publish("SET_STATUS", newStatusUser)
    return newStatusUser;
}

export default setStatus;