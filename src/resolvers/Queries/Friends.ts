import { GraphQLFieldResolveFn } from '../../common/types'

const FriendShip: GraphQLFieldResolveFn = {
    users: (parent, args, context, info) => {
        return context.db.friendships.findOne({ where: { id: parent.id } }).users()
    }


}
export default FriendShip;