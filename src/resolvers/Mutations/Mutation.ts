import { newChat, deleteChat } from './ChatActions'
import newMessage from './MessageActions'
import { GraphQLFieldResolveFn } from '../types'
import signup from './SignUp'
import login from './Login'
import { sendRequest, acceptRequest } from './FriendActions'

const Mutation: GraphQLFieldResolveFn = {
    newChat: newChat,
    deleteChat: deleteChat,
    newMessage: newMessage,
    signup: signup,
    login: login,
    sendRequest: sendRequest,
    acceptRequest: acceptRequest

}

export default Mutation;