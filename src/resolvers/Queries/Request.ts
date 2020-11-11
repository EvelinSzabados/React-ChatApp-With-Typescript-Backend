import { GraphQLFieldResolveFn } from '../../common/types'

const FriendRequest: GraphQLFieldResolveFn = {
    reciever: (parent, args, context, info) => {
        return context.db.friendRequests.findOne({ where: { id: parent.id } }).reciever()
    },

    sender: (parent, args, context, info) => {
        return context.db.friendRequests.findOne({ where: { id: parent.id } }).sender()
    }
}
export default FriendRequest;