import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo } from "graphql/type"
import { GraphQLResolveFn } from '../types'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../../utils'

const signup: GraphQLResolveFn = async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.db.users.create({ data: { ...args, password } })

    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
        token,
        user,
    }
}

export default signup;
