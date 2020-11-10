import { GraphQLSubscriptionResolveFn } from '../types'
import newChat from "./NewChat";
import newMessage from "./NewMessage";
import deleteChat from "./DeleteChat";

const Subscription: GraphQLSubscriptionResolveFn = {
    newChat: newChat,
    newMessage: newMessage,
    deleteChat: deleteChat
}

export default Subscription;