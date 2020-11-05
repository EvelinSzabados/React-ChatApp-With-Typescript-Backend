import { GraphQLResolveFn } from '../types'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../../utils'

const signup: GraphQLResolveFn = async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.db.users.create({
        data: {
            email: args.email,
            password: password,
            displayName: args.displayName,
            status: 'OFFLINE',
            profilePictureUrl: '',
            friends: [],
            friendRequestsSent: [],
            friendRequestsRecieved: []

        }
    })

    const token = jwt.sign({ userId: user.id }, APP_SECRET, { noTimestamp: true })
    return {
        token,
        user,
    }
}

export default signup;
