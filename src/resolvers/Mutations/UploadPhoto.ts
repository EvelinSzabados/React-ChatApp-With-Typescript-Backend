import { GraphQLResolveFn } from '../../common/types'
var cloudinary = require('cloudinary');

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

        return `Successful-Photo URL: ${result.url}`;
    } catch (e) {

        return `Image could not be uploaded:${e.message}`;
    }


}




