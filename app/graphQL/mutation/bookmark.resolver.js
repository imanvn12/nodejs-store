const { GraphQLString } = require("graphql");
const { responseType } = require("../typeDef/public.typedef");
const { verifyAccessTokenInGraphql } = require("../../http/middlewares/vrifyAccssecToken");
const { BlogModel } = require("../../model/blogs");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

const bookmarkBlog = {
    type: responseType,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const { blogID } = args;
        const user = await verifyAccessTokenInGraphql(req);
        const Blog = await findBlog(blogID);
        const blog = await BlogModel.findOne({ _id: blogID, bookmark: user._id });
        const updateQuery = blog ? { $pull: { bookmark: user._id } } : { $push: { bookmark: user._id } };
        await BlogModel.updateOne({ _id: Blog._id }, updateQuery)
        let message;
        if (!blog) message = 'blog bookmarked successfully';
        else message = 'blog unbookmarked';
        return {
            statuscode: StatusCodes.CREATED,
            data: {
                message: message
            }
        }

    }
}

async function findBlog(blogID) {
    const blog = await BlogModel.findById(blogID);
    if (!blog) throw createHttpError.NotFound('Blog not found');
    return blog;
}

module.exports = {
    bookmarkBlog
}