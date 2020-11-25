require('dotenv').config();
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
import FriendRequest from "./resolvers/Queries/Request"
import { rule, shield, allow } from 'graphql-shield'
import { Context } from 'graphql-yoga/dist/types'
import { GraphQLResolveInfo } from 'graphql/type'
import { getUserId } from './common/utils'
import FriendShip from "./resolvers/Queries/Friends"
import { ConnectionOptions } from 'tls';
import { verify } from 'jsonwebtoken';

const pubsub = new PubSub()
const prisma = new PrismaClient()

let currentUserIDFromSubscription: string | null = null;

const resolvers = {
    Query, Chat, Message, User, FriendRequest, Mutation, Subscription, FriendShip
}
const isAuthenticated = rule({ cache: "contextual" })(
    async (_parent: any, _args: any, context: Context, _info: GraphQLResolveInfo) => {
        return context.userId !== "Not authenticated"
    }
)

const permissions = shield({
    Mutation: {
        login: allow,
        signup: allow
    },

}, {
    fallbackRule: isAuthenticated
});


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    middlewares: [permissions],
    context: async (request: ContextParameters, response: ContextParameters, connection: ContextParameters) => ({
        ...request,
        ...response,
        ...connection,
        db: prisma,
        pubsub,
        userId: request.request ? await Object.values(getUserId(request.request))[0] : null,
        subUserId: currentUserIDFromSubscription


    })

})

server.start({
    cors: { origin: ["http://localhost:3000"], credentials: true },
    subscriptions: {
        path: "/",
        onConnect: async (connectionParams: ConnectionOptions, webSocket: any) => {
            try {
                const refreshToken = await webSocket.upgradeReq.headers.cookie
                    .split(" ")
                    .filter((cookie: any) => cookie.includes("Bearer"))[0]
                    .replace("Bearer=", "");

                const userId = verify(refreshToken, 'k-i-n-s-t-a')
                currentUserIDFromSubscription = Object.values(userId)[0]

            } catch (e) {
                throw new Error(e.message);
            }
        }
    }
}, () => console.log(`Server is running on http://localhost:4000`))