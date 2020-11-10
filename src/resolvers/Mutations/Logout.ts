import { GraphQLResolveFn, Status } from '../types'
import { getUserId } from '../../utils'

const logout: GraphQLResolveFn = async (parent, args, context, info) => {
    const userId = getUserId(context.request)
    context.db.users.update({
        where: {
            id: Object.values(userId)[0]
        },
        data: {
            status: Status.OFFLINE
        }
    })
    context.response.clearCookie("Bearer")
    return "Successful logout"
}

export default logout;