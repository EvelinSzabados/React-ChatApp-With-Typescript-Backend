import { GraphQLServer } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'
import Chat from './resolvers/Queries/Chat'
import Message from './resolvers/Queries/Message'
import User from './resolvers/Queries/User'
import Query from './resolvers/Queries/Query'
import Mutation from './resolvers/Mutations/Mutation'
import { getUserId } from './utils'
import { rule, shield } from 'graphql-shield'
import { Context } from 'graphql-yoga/dist/types'
import { GraphQLResolveInfo } from 'graphql/type'


const prisma = new PrismaClient()

const resolvers = {
    Query, Chat, Message, User, Mutation
}

// const isAuthenticated = rule({ cache: "contextual" })(
//     async (parent: any, args: any, context: Context, info: GraphQLResolveInfo) => {

//         return context.userId !== null
//     }
// )

// const permissions = shield({
//     Query: {
//         chats: isAuthenticated
//     }
// });

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    // middlewares: [permissions],
    context: async (request: any) => ({
        ...request,
        db: prisma,
        // userId: getUserId(request)
    })

})

server.start(() => console.log(`Server is running on http://localhost:4000`))