import { GraphQLResolveFn, Status } from '../../common/types'
import { getUserId } from '../../common/utils'

const logout: GraphQLResolveFn = async (parent, args, context, info) => {
    const userId = getUserId(context.request)
    const userStatusUpdated = await context.db.users.update({
        where: {
            id: Object.values(userId)[0]
        },
        data: {
            status: Status.OFFLINE
        }
    })
    context.pubsub.publish("SET_STATUS", userStatusUpdated)

    context.response.clearCookie("Bearer")

    return "Successful logout"
}

export default logout;