function chats(parent, args, context, info) {

    return context.db.chat.findMany()
}
function chat(parent, args, context, info) {
    const argsId = parseInt(args.id)
    return context.db.chat.findOne({ where: { id: argsId } })
}

function messages(parent, args, context, info) {
    return context.db.message.findMany()
}

function message(parent, args, context, info) {
    const argsId = parseInt(args.id)
    return context.db.message.findOne({ where: { id: argsId } })
}

module.exports = {
    chats, chat, messages, message
}
