import { GraphQLResolveFn } from '../types'
import { getUserId } from '../../utils'

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
    return newStatusUser;
}

export default setStatus;