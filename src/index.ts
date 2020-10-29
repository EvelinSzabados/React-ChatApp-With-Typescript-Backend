import { GraphQLServer } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'
const Query = require('./resolvers/Query')
const Chat = require('./resolvers/Chat')
const Message = require('./resolvers/Message')
const User = require('./resolvers/User')

const prisma = new PrismaClient()

const resolvers = {
    Query,Chat, Message, User
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: async () => ({
        db: prisma,
    })

})

server.start(() => console.log(`Server is running on http://localhost:4000`))