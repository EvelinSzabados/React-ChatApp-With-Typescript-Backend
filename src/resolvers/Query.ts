function chat(parent, args, context, info) {
    return context.db.chat.findMany()
}

module.exports = {
    chat
}
