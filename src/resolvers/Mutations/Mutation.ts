import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo } from "graphql/type"
import {newChat, deleteChat} from './ChatActions'
import {newMessage} from './MessageActions'

const Mutation = {
    newChat: newChat,
    deleteChat: deleteChat,
    newMessage: newMessage
}

export default Mutation;