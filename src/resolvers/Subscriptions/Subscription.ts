import { GraphQLSubscriptionResolveFn } from '../types'
import newChat from "./NewChat";
import newMessage from "./NewMessage";

const Subscription: GraphQLSubscriptionResolveFn = {
    newChat: newChat,
    newMessage: newMessage
}

export default Subscription;