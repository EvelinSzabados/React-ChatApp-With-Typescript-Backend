import { GraphQLFieldResolveFn } from '../types'

const User: GraphQLFieldResolveFn = {
    friendRequestsSent: (parent, args, context, info) => {
        return context.db.users.findOne({ where: { id: parent.id } }).friendRequestsSent()
    },
    friendRequestsRecieved: (parent, args, context, info) => {
        return context.db.users.findOne({ where: { id: parent.id } }).friendRequestsRecieved()
    },
    friends: (parent, args, context, info) => {
        return context.db.users.findOne({ where: { id: parent.id } }).friends()
    },


}
export default User;