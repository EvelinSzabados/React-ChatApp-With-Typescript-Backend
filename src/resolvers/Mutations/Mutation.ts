import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo } from "graphql/type"
import {newChat, deleteChat} from './ChatActions'

const Mutation = {
    newChat: newChat,
    deleteChat: deleteChat
}

export default Mutation;