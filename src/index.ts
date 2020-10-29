import { GraphQLServer } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'
import Chat from './resolvers/Chat'
import Message from './resolvers/Message'
import User from './resolvers/User'
import Query from './resolvers/Query'

const prisma = new PrismaClient()

const resolvers = {
    Query, Chat, Message, User
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: async () => ({
        db: prisma,
    })

})

server.start(() => console.log(`Server is running on http://localhost:4000`))