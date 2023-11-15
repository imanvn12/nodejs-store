const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const { antype } = require("../query/anytype.resolver");

const category = new GraphQLObjectType({
    name: 'category',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
    }
})
const categories = new GraphQLList(new GraphQLObjectType({
    name: "categories",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        parents: { type: GraphQLString },
        children: { type: new GraphQLList(antype) }
    }
}))


module.exports = {
    categories
}