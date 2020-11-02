import { Context } from "graphql-yoga/dist/types"
import { GraphQLResolveInfo, } from "graphql/type"

export type GraphQLFieldResolveFn = {
    [key: string]: GraphQLResolveFn
}

export type GraphQLResolveFn = (
    parent: any,
    args: { [argName: string]: any },
    context: Context,
    info: GraphQLResolveInfo) => any