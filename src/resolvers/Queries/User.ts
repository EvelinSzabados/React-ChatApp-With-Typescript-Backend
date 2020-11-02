import { GraphQLFieldResolveFn } from '../types'

const User: GraphQLFieldResolveFn = {
    status: (parent, args, context, info) => {
        return context.db.users.findOne({ where: { id: parent.id } }).status()
    }

}
export default User;