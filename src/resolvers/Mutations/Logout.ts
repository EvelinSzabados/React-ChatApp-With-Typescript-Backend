import { GraphQLResolveFn, Status } from '../../common/types'

const logout: GraphQLResolveFn = async (parent, args, context, info) => {
    const userStatusUpdated = await context.db.users.update({
        where: {
            id: parseInt(context.userId)
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