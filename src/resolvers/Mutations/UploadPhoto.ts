import { GraphQLResolveFn } from '../../common/types'
const cloudinary = require('cloudinary');

export const uploadPhoto: GraphQLResolveFn = async (parent, args, context, info) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });


    try {

        const result = await cloudinary.v2.uploader.upload(args.photo, {
            allowed_formats: ["jpg", "png"],
            public_id: "",
            folder: "profile_pictures",

        });
        await context.db.users.update({
            where: { id: context.userId },
            data: {
                profilePictureUrl: result.url
            }
        })
        return `Successful-Photo URL: ${result.url}`;
    } catch (e) {

        return `Image could not be uploaded:${e.message}`;
    }


}




