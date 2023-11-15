const { GraphQLString } = require("graphql")
const { productModel } = require("../../model/products")
const { products } = require("../typeDef/product.typedef")

const productResolver = {
    type: products,

    args: {
        category: { type: GraphQLString }
    },

    resolve: async (_, args) => {
        const { category } = args;
        const query = category ? { category } : {};

        return await productModel.find(query)
    }
}

module.exports = {
    productResolver
}