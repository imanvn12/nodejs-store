const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const products = new GraphQLList(new GraphQLObjectType({
    name: "products",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        shortdescription: {type: GraphQLString},
        description: {type: GraphQLString},
        images: {type: new GraphQLList(GraphQLString)},
    }
}))

module.exports = {
    products
}