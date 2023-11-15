const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");
const { antype } = require("../query/anytype.resolver");

const authortype = new GraphQLObjectType({
    name: "authortype",
    fields: {
        _id: { type: GraphQLString },
        phone: { type: GraphQLInt },
        email: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString }
    }
})

const commentResponseType = new GraphQLObjectType({
    name: "commentResponseType",
    fields: {
        statuscode: { type: GraphQLString },
        data: { type: antype },
    }
})
const responseType = new GraphQLObjectType({
    name: "responseType",
    fields: {
        statuscode: { type: GraphQLString },
        data: { type: antype },
    }
})

module.exports = {
    authortype,
    commentResponseType,
    responseType
}