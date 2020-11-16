import { GraphQLResolveFn } from '../../common/types'

const setStatus: GraphQLResolveFn = async (parent, args, context, info) => {

    const newStatusUser = context.db.users.update({
        where: {
            id: parseInt(context.userId)
        },
        data: {
            status: args.statusName
        }
    })
    context.pubsub.publish("SET_STATUS", newStatusUser)
    return newStatusUser;
}

export default setStatus;