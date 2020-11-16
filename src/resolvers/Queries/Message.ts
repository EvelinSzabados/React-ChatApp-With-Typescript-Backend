import { GraphQLFieldResolveFn } from '../../common/types'

const Message: GraphQLFieldResolveFn = {
    sender: (parent, args, context, info) => {
        return context.db.messages.findOne({ where: { id: parent.id } }).sender()
    }


}
export default Message;