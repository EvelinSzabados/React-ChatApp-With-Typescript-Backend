import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo } from "graphql/type"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './utils'

export default async function signup(parent: any, args: any, context: Context, info: GraphQLResolveInfo) {
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.db.users.create({ data: { ...args, password } })

    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
        token,
        user,
    }
}