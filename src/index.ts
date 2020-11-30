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
import { SubscriptionServer } from 'subscriptions-transport-ws';

const pubsub = new PubSub()
const prisma = new PrismaClient()

let currentUserIDFromSubscription: any = null;

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
    Subscription: {
        newMessage: allow
    }
}, {
    fallbackRule: isAuthenticated
});






const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    middlewares: [permissions],
    context: async ({ request, response, connection }: ContextParameters) => ({
        response: response,
        db: prisma,
        pubsub,
        userId: request ? await Object.values(getUserId(request))[0] : currentUserIDFromSubscription,
    })

})

server.start({
    cors: { origin: ["http://localhost:3000"], credentials: true },
    subscriptions: {
        path: "/subscriptions",
        onConnect: async (connectionParams: ConnectionOptions, webSocket: any) => {
            try {
                const promise = new Promise(async (resolve, reject) => {

                    const refreshToken = await webSocket.upgradeReq.headers.cookie
                        .split(" ")
                        .filter((cookie: any) => cookie.includes("Bearer"))[0]
                        .replace("Bearer=", "");
                    const userId = verify(refreshToken, 'k-i-n-s-t-a')

                    if (userId !== "Not authenticated") {
                        resolve(Object.values(userId)[0]);
                    } else {
                        reject('Not authenticated');
                    }
                    return userId


                });

                const user = await promise;
                currentUserIDFromSubscription = user;

            } catch (error) {
                console.log(error)
            }

        },
        onDisconnect: async (connectionParams: ConnectionOptions, webSocket: any) => {
            currentUserIDFromSubscription = null;
        }

    }
}, () => console.log(`Server is running on http://localhost:4000`))