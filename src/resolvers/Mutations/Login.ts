import { GraphQLResolveFn, Status } from '../../common/types'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../../common/utils'

const login: GraphQLResolveFn = async (parent, args, context, info) => {
    let user = await context.db.users.findOne({ where: { email: args.email } })
    if (!user) {
        throw new Error('No such user found')
    }
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET, { noTimestamp: true })
    const options = {
        maxAge: 1000 * 60 * 60 * 24, //expires in a day
        httpOnly: true,
        domain: "localhost",

    }
    context.response.cookie('Bearer', token, options)
    await context.db.users.update({
        where: {
            id: user.id
        },
        data: {
            status: Status.AVAILABLE
        }
    })

    user = await context.db.users.findOne({ where: { email: args.email } })
    context.pubsub.publish("SET_STATUS", user)

    return {
        token,
        user,
    }
}

export default login;