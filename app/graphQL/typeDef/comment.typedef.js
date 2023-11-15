const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");
const { authortype } = require("./public.typedef");

const parentsOfCommentType = new GraphQLList(new GraphQLObjectType({
    name: 'parentsOfCommentType',
    fields: {
        _id: { type: GraphQLString },
        writer: { type: authortype },
        text: { type: GraphQLString },
        parents: { type: GraphQLString },
        show: { type: GraphQLBoolean },
        openToReplay: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString }
    }
}))

const commentType = new GraphQLList(new GraphQLObjectType({
    name: 'commentType',
    fields: {
        _id: { type: GraphQLString },
        writer: { type: authortype },
        text: { type: GraphQLString },
        show: { type: GraphQLBoolean },
        openToReplay: { type: GraphQLBoolean },
        answers: { type: parentsOfCommentType },
        createdAt: { type: GraphQLString }
    }
}))

module.exports = {
    commentType
}