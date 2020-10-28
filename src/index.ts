import { GraphQLServer } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'
const { ApolloServer, gql } = require('apollo-server');
const Query = require('./resolvers/Query')

const prisma = new PrismaClient()

const resolvers = {
    Query
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: async () => ({
        db: prisma,
    })
    // context: (request: ContextParameters) => {
    //     return {
    //         ...request,
    //         prisma

    //     }
    // }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))