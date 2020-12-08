import { GraphQLResolveFn, Status } from '../../common/types'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../../common/utils'

const signup: GraphQLResolveFn = async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.db.users.create({
        data: {
            email: args.email,
            password: password,
            displayName: args.displayName,
            status: Status.AVAILABLE,
            profilePictureUrl: '',
            friends: [],
            friendRequestsSent: [],
            friendRequestsRecieved: []

        }
    })

    const token = jwt.sign({ userId: user.id }, APP_SECRET, { noTimestamp: true })

    const options = {
        maxAge: 2 * 3600 * 1000 + 2000, //expires in a day
        httpOnly: true,
        domain: "localhost",

    }
    context.response.cookie('Bearer', token, options)

    return {
        token,
        user,
    }
}

export default signup;
