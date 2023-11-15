const { GraphQLString } = require("graphql");
const { categoriesModel } = require("../../model/categories");
const { categories } = require("../typeDef/ctegory.typedef");
const { verifyAccessTokenInGraphql } = require("../../http/middlewares/vrifyAccssecToken");

const categoryResolver = {
    type: categories,
    resolve: async (_, args, context) => {
        const { req } = context;

        req.user = await verifyAccessTokenInGraphql(req)
        return await categoriesModel.find({})
    }
}

const cildOfCategory = {
    type: categories,

    args: {
        parents: { type: GraphQLString }
    },

    resolve: async (_, args, context, info) => {

        const { parents } = args;
        return await categoriesModel.find({ parents })
    }
}

module.exports = {
    categoryResolver,
    cildOfCategory
};