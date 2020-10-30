import { newChat, deleteChat } from './ChatActions'
import { newMessage } from './MessageActions'

const Mutation = {
    newChat: newChat,
    deleteChat: deleteChat,
    newMessage: newMessage
}

export default Mutation;