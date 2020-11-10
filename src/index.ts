import { GraphQLServer } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'
import Chat from './resolvers/Queries/Chat'
import Message from './resolvers/Queries/Message'
import User from './resolvers/Queries/User'
import Query from './resolvers/Queries/Query'
import Mutation from './resolvers/Mutations/Mutation'
import { ContextParameters } from 'graphql-yoga/dist/types'
import { PubSub } from 'graphql-yoga'
import Subscription from './resolvers/Subscriptions/Subscription';

const pubsub = new PubSub()
const prisma = new PrismaClient()

const resolvers = {
    Query, Chat, Message, User, Mutation, Subscription
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: async (request: ContextParameters, response: ContextParameters) => ({
        ...request,
        ...response,
        db: prisma,
        pubsub
    })

})

server.start({ cors: { credentials: true } }, () => console.log(`Server is running on http://localhost:4000`))