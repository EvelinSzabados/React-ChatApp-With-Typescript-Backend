import { verify } from 'jsonwebtoken'

export const APP_SECRET = 'k-i-n-s-t-a'

export function getUserId(request: any) {
    const Authorization = request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const userId = verify(token, APP_SECRET)
        return userId
    }

    throw new Error('Not authenticated')
}
