const { GraphQLString } = require("graphql");
const { verifyAccessTokenInGraphql } = require("../../http/middlewares/vrifyAccssecToken");
const { BlogModel } = require("../../model/blogs");
const { responseType } = require("../typeDef/public.typedef");
const { StatusCodes } = require("http-status-codes");

const dislikeBlog = {
    type: responseType,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const { blogID } = args;
        const user = await verifyAccessTokenInGraphql(req);
        const blog = await findBlog(blogID);
        let message;

        if (blog.like.includes(user._id)) {
            await BlogModel.updateOne({ _id: blog._id }, {
                $pull: {
                    like: user.id,
                }
            })
        };
        if (blog.dislike.includes(user._id)) {
            await BlogModel.updateOne({ _id: blog._id }, {
                $pull: {
                    dislike: user.id,
                }
            });
            message = "dislike blog has canseled";
        } else {
            await BlogModel.updateOne({ _id: blog._id }, {
                $push: {
                    dislike: user.id,
                }
            });
            message = "dislike blog successfuly";
        }

        return {
            statuscode: StatusCodes.CREATED,
            data: {
                message
            }
        }
    }
}

async function findBlog(blogID) {
    const blog = await BlogModel.findOne({ _id: blogID }, { like: 1, dislike: 1 });
    if (!blog) throw createHttpError.NotFound('Blog not found');
    return blog;
}

module.exports = {
    dislikeBlog
}