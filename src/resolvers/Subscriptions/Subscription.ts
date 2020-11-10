import { GraphQLSubscriptionResolveFn } from '../types'
import newChat from "./NewChat";

const Subscription: GraphQLSubscriptionResolveFn = {
    newChat: newChat
}

export default Subscription;