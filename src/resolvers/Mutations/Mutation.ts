import { newChat, deleteChat } from './ChatActions'
import newMessage from './MessageActions'
import { GraphQLFieldResolveFn } from '../types'
import signup from './SignUp'
import login from './Login'
import { sendRequest, acceptRequest, deleteFriend } from './FriendActions'
import setStatus from "./Status"
import logout from "./Logout"

const Mutation: GraphQLFieldResolveFn = {
    newChat: newChat,
    deleteChat: deleteChat,
    newMessage: newMessage,
    signup: signup,
    login: login,
    sendRequest: sendRequest,
    acceptRequest: acceptRequest,
    deleteFriend: deleteFriend,
    setStatus: setStatus,
    logout: logout

}

export default Mutation;