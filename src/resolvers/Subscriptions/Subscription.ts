import { GraphQLSubscriptionResolveFn } from '../types'
import newChat from "./NewChat";
import newMessage from "./NewMessage";
import deleteChat from "./DeleteChat";
import newRequest from "./SendRequest"
import acceptRequest from "./AcceptRequest"
import declineRequest from "./DeclineRequest"
import deleteFriend from "./DeleteFriend"
import setStatus from "./SetStatus";

const Subscription: GraphQLSubscriptionResolveFn = {
    newChat: newChat,
    newMessage: newMessage,
    deleteChat: deleteChat,
    sendRequest: newRequest,
    acceptRequest: acceptRequest,
    declineRequest: declineRequest,
    deleteFriend: deleteFriend,
    setStatus: setStatus
}

export default Subscription;