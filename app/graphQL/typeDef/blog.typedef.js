const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require("graphql")
const { authortype } = require("./public.typedef")
const { commentType } = require("./comment.typedef")

const blogType = new GraphQLList(new GraphQLObjectType({
    name: "blogtype",
    fields: {
        _id: { type: GraphQLString },
        author: { type: authortype },
        title: { type: GraphQLString },
        shorttext: { type: GraphQLString },
        text: { type: GraphQLString },
        category: { type: new GraphQLList(GraphQLInt) },
        like: { type: new GraphQLList(authortype) },
        dislike: { type: new GraphQLList(authortype) },
        bookmark: { type: new GraphQLList(authortype) },
        comments: {type: commentType}
    }
}))

module.exports = {
    blogType
}
