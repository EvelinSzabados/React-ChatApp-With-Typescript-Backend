import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo } from "graphql/type"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './utils'

export default async function login(parent: any, args: any, context: Context, info: GraphQLResolveInfo) {

    const user = await context.db.users.findOne({ where: { email: args.email } })
    if (!user) {
        throw new Error('No such user found')
    }
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}