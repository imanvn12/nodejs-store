const { GraphQLString } = require("graphql");
const { commentType } = require("../typeDef/comment.typedef");
const { verifyAccessTokenInGraphql } = require("../../http/middlewares/vrifyAccssecToken");
const { BlogModel } = require("../../model/blogs");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { commentResponseType } = require("../typeDef/public.typedef");
const { default: mongoose } = require("mongoose");

const commentForBlogResolver = {
    type: commentResponseType,
    args: {
        text: { type: GraphQLString },
        blogID: { type: GraphQLString },
        parents: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const { text, blogID, parents } = args;

        const user = await verifyAccessTokenInGraphql(req);
        const Blog = await checkExistID(blogID);


        if (parents && mongoose.isValidObjectId(parents)) {
            await checkanswersID(parents)

            await BlogModel.updateOne({ _id: Blog._id, "comments._id": parents }, {
                $push: {
                    "comments.$.answers": {
                        text,
                        writer: user._id,
                        parents,
                        show: false,
                        openToReplay: !parents
                    }
                }
            })
            return {
                statuscode: StatusCodes.CREATED,
                data: {
                    message: 'your comment has been created. after accept it will show in website'
                }
            }
        } else {

            await BlogModel.updateOne({ _id: Blog._id }, {
                $push: {
                    comments: {
                        text,
                        writer: user._id,
                        show: false,
                        openToReplay: !parents
                    }
                }
            })
            return {
                statuscode: StatusCodes.CREATED,
                data: {
                    message: 'your comment has been created. after accept it will show in website'
                }
            }
        }
    }
}

async function checkExistID(id) {
    const blog = await BlogModel.findById(id);
    if (!blog) throw createHttpError.NotFound("blog isnt exist");
    return blog

}

async function checkExistParentsID(parentsID) {

    const parentsComment = await BlogModel.findOne({ "comments._id": parentsID }, { "comments.$": 1 });
    const hiiissss = JSON.parse(JSON.stringify(parentsComment));

    if (!parentsComment) throw createHttpError.BadRequest("this comment does not exist");
    if (hiiissss?.comments.map(comment => comment.openToReplay).includes(false)) throw createHttpError.BadRequest("cant open to replay");

    return parentsComment
}

async function checkanswersID(parentsID) {

    const answersComment = await BlogModel.findOne({ "comments.answers._id": parentsID }, { "comments.answers.$": 1 });
    const hiiissss = JSON.parse(JSON.stringify(answersComment));
    // console.log(hiiissss?.comments.map(field => field.answers.map(field => field._id).includes(parentsID)));

    if (hiiissss?.comments.map(field => field.answers.map(field => field._id).includes(parentsID))) {
        throw createHttpError.BadRequest('you cant reply child comments')
    }
    return answersComment
}
module.exports = {
    commentForBlogResolver
}

