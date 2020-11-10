import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo, } from "graphql/type"

export type GraphQLFieldResolveFn = {
    [key: string]: GraphQLResolveFn,

}

export type GraphQLSubscriptionResolveFn = {
    [key: string]: GraphQLSubscriptionFn,

}


export type GraphQLResolveFn = (
    parent: any,
    args: { [argName: string]: any },
    context: Context,
    info: GraphQLResolveInfo) => any

export type GraphQLSubscriptionFn = {
    subscribe: GraphQLResolveFn,
    resolve: (payload: any) => any
}

export type Chat = {
    id: number
    lastUpdated: String
    users: [User]
    messages: [Message]
}
export type Message = {
    id: number
    sender: User
    text: String
}
export type User = {
    id: number
    displayName: String
    email: String
    password: String
    profilePictureUrl: String
    status: Status
    friends: [FriendShip]
    friendRequestsSent: [FriendRequest],
    friendRequestsRecieved: [FriendRequest]
}

export type FriendRequest = {
    id: number,
    sender: User
    reciever: User
}

export type FriendShip = {
    id: number
    users: [User]
}

export type AuthPayload = {
    token: String
    user: User
}

export enum Status {
    OFFLINE,
    BUSY,
    AVAILABLE,
}