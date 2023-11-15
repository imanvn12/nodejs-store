const { GraphQLString, GraphQLInt } = require("graphql");
const { responseType } = require("../typeDef/public.typedef");
const { verifyAccessTokenInGraphql } = require("../../http/middlewares/vrifyAccssecToken");
const { BlogModel } = require("../../model/blogs");
const { userModel } = require("../../model/users");
const { StatusCodes } = require("http-status-codes");
const { courseModel } = require("../../model/course");
const createHttpError = require("http-errors");

const addBlogToBasket = {
    type: responseType,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const { blogID } = args;
        const user = await verifyAccessTokenInGraphql(req);
        const blog = await findBlog(user._id, blogID);
        console.log(blog);
        if (blog) {
            await userModel.updateOne(
                {
                    _id: user._id,
                    "basket.blog.BlogID": blogID
                },
                {
                    $inc: {
                        "basket.blog.$.count": 1
                    }
                }
            )
        } else {
            await userModel.updateOne(
                {
                    _id: user._id
                },
                {
                    $push: {
                        "basket.blog": {
                            BlogID: blogID,
                            count: 1
                        }
                    }
                }
            )
        }

        return {
            statuscode: StatusCodes.OK,
            data: {
                message: 'blog added to basket successfully'
            }
        }

    }
}

const addCourseToBasket = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const { courseID } = args;
        const user = await verifyAccessTokenInGraphql(req);
        const usercourses = await userModel.findOne({_id: user._id, courses: courseID});
        if(usercourses) throw createHttpError.BadRequest("you have this course already");
        const course = await findCourse(user._id, courseID);
        console.log(course);
        if (course) {
            throw createHttpError.BadRequest('this course is already exist in basket')
        } else {
            await userModel.updateOne(
                {
                    _id: user._id
                },
                {
                    $push: {
                        "basket.course": {
                            CourseID: courseID,
                            count: 1
                        }
                    }
                }
            )
        }
        return {
            statuscode: StatusCodes.OK,
            data: {
                message: 'course added to basket successfully'
            }
        }
    }
}

const addProductToBasket = {
    type: responseType,
    args: {
        productID: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const { productID } = args;
        const user = await verifyAccessTokenInGraphql(req);
        const product = await findProduct(user._id, productID);
        console.log(product);
        let message;
        if (product) {
            await userModel.updateOne(
                { _id: user._id, "basket.product.ProductID": productID },
                {
                    $inc: {
                        "basket.product.$.count": 1
                    }
                }
            );
            message = "product inc from your basket successfily"
        } else {
            await userModel.updateOne(
                { _id: user._id },
                {
                    $push: {
                        "basket.product": {
                            ProductID: productID,
                            count: 1
                        }
                    }
                }
            );
            message = "product added to your basket successfily"
        };
        return {
            statuscode: StatusCodes.OK,
            data: {
                message
            }
        }

    }
}

const removeBlogFromBasket = {
    type: responseType,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const { blogID } = args;
        const user = await verifyAccessTokenInGraphql(req);
        const blog = await findBlog(user._id, blogID);
        if (!blog) throw createHttpError.NotFound('this blog does not exist in your basket');
        let message;
        if (blog.count > 1) {
            await userModel.updateOne(
                { _id: user._id, "basket.blog.BlogID": blogID },
                {
                    $inc: {
                        "basket.blog.$.count": -1
                    }
                }
            )
            message = "decsise one count blog of your basket";
        } else {
            await userModel.updateOne(
                { _id: user._id, "basket.blog.BlogID": blogID },
                {
                    $pull: {
                        "basket.blog": {
                            BlogID: blogID
                        }
                    }
                }
            )
            message = "blog deleted from your basket";
        };
        return {
            statuscode: StatusCodes.OK,
            data: {
                message
            }
        }
    }
}

const removeCourseFromBasket = {
    type: responseType,
    args: {
        blogID: { type: GraphQLString },
        count: { type: GraphQLInt }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const { blogID, count } = args;
    }
}

const removeProductFromBasket = {
    type: responseType,
    args: {
        blogID: { type: GraphQLString },
        count: { type: GraphQLInt }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const { blogID, count } = args;
    }
}


async function findBlog(userID, blogID) {
    const blog = await userModel.findOne({ _id: userID, "basket.blog.BlogID": blogID }, { "basket.blog.$": 1 });
    const copyObject = JSON.parse(JSON.stringify(blog));
    return copyObject?.basket?.blog[0]
}

async function findCourse(userID, courseID) {
    const course = await userModel.findOne({ _id: userID, "basket.course.CourseID": courseID }, { "basket.course.$": 1 });
    const copyObject = JSON.parse(JSON.stringify(course));
    return copyObject?.basket?.course[0]
}


async function findProduct(userID, productID) {
    const product = await userModel.findOne({ _id: userID, "basket.product.ProductID": productID }, { "basket.product.$": 1 });
    const copyObject = JSON.parse(JSON.stringify(product));
    return copyObject?.basket?.product[0]

}

module.exports = {
    addBlogToBasket,
    addCourseToBasket,
    addProductToBasket,
    removeBlogFromBasket,
    removeCourseFromBasket,
    removeProductFromBasket
}