import { newChat, deleteChat } from './ChatActions'
import newMessage from './MessageActions'
import { GraphQLFieldResolveFn } from '../types'
import signup from './SignUp'
import login from './Login'

const Mutation: GraphQLFieldResolveFn = {
    newChat: newChat,
    deleteChat: deleteChat,
    newMessage: newMessage,
    signup: signup,
    login: login,

}

export default Mutation;