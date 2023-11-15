// const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = require("graphql");

const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { blog } = require("./query/blog.resolver");
const { productResolver } = require('./query/product.resolver');
const { categoryResolver, cildOfCategory } = require("./query/category.resolver");
const { courseResolver } = require("./query/course.resolver");
const { commentForBlogResolver } = require("./query/comment.resolver");
const { likeBlog } = require("./mutation/likes.resolver");
const { dislikeBlog } = require("./mutation/dislike.resolver");
const { bookmarkBlog } = require("./mutation/bookmark.resolver");
const { getUserBookmarkedBlog, getUserBasket } = require("./query/user-profile.resolver");
const { addBlogToBasket, addCourseToBasket, addProductToBasket, removeBlogFromBasket, removeCourseFromBasket, removeProductFromBasket } = require("./mutation/user-basket.resolver")

// const rootQuery = new GraphQLObjectType({
//     name: "rootQuery",
//     fields: {
//         blogs: {
//             type: new GraphQLObjectType({
//                 name: 'blogtypes',
//                 fields: {
//                     id: { type: GraphQLInt },
//                     text: { type: GraphQLString },
//                     image: { type: GraphQLString },
//                 }
//             }),
//             resolve: () => {
//                 return {
//                     id: 1,
//                 text: "graphql text",
//                 image: 'index.png'
//                 }
//             }
//         }
//     }
// })

// importants: query, mutation, schema, types

const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    // fields: blog,
    fields: {
        blogs: blog,
        products: productResolver,
        categories: categoryResolver,
        chidofcategory: cildOfCategory,
        bookmarked: getUserBookmarkedBlog,
        courses: courseResolver,
        getUserBasket
    }
})

const rootMutation = new GraphQLObjectType({
    name: "rootMutation",
    fields: {
        createComment: commentForBlogResolver,
        likeBlog,
        dislikeBlog,
        bookmarkBlog,
        addBlogToBasket,
        addCourseToBasket,
        removeBlogFromBasket,
        removeCourseFromBasket,
        addProductToBasket
    }
})

const graphqlSchema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})

module.exports = {
    graphqlSchema
}

