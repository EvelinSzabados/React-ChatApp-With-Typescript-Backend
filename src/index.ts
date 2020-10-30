import { GraphQLServer } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'
import Chat from './resolvers/Queries/Chat'
import Message from './resolvers/Queries/Message'
import User from './resolvers/Queries/User'
import Query from './resolvers/Queries/Query'
import Mutation from './resolvers/Mutations/Mutation'

const prisma = new PrismaClient()

const resolvers = {
    Query, Chat, Message, User, Mutation
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: async () => ({
        db: prisma,
    })

})

server.start(() => console.log(`Server is running on http://localhost:4000`))