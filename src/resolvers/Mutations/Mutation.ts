import { newChat, deleteChat } from './ChatActions'
import newMessage from './MessageActions'
import { GraphQLFieldResolveFn } from '../types'

const Mutation: GraphQLFieldResolveFn = {
    newChat: newChat,
    deleteChat: deleteChat,
    newMessage: newMessage
}

export default Mutation;