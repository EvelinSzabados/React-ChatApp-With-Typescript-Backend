import { newChat, deleteChat } from './ChatActions'
import newMessage from './MessageActions'
import { GraphQLFieldResolveFn } from '../../common/types'
import signup from './SignUp'
import login from './Login'
import { sendRequest, acceptRequest, deleteFriend, declineRequest } from './FriendActions'
import setStatus from "./Status"
import logout from "./Logout"
import { uploadPhoto } from "./UploadPhoto";

const Mutation: GraphQLFieldResolveFn = {
    newChat: newChat,
    deleteChat: deleteChat,
    newMessage: newMessage,
    signup: signup,
    login: login,
    sendRequest: sendRequest,
    acceptRequest: acceptRequest,
    declineRequest: declineRequest,
    deleteFriend: deleteFriend,
    setStatus: setStatus,
    logout: logout,
    uploadPhoto: uploadPhoto

}

export default Mutation;