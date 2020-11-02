import { GraphQLResolveFn } from '../types'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../../utils'

const login: GraphQLResolveFn = async (parent, args, context, info) => {
    const user = await context.db.users.findOne({ where: { email: args.email } })
    if (!user) {
        throw new Error('No such user found')
    }
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    const options = {
        maxAge: 1000 * 60 * 60 * 24, //expires in a day
        httpOnly: true,
        domain: "localhost",


    }
    context.response.cookie('Bearer', token, options)

    return {
        token,
        user,
    }
}

export default login;