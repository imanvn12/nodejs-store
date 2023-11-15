const { GraphQLString } = require("graphql");
const { courseModel } = require("../../model/course")
const { courses } = require("../typeDef/course.typedef")

const courseResolver = {
    type: courses,
    args: {
        _id: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { _id } = args;
        const query = _id ? { _id } : {};
        return await courseModel.find(query).populate({ path: "teacher", path: "category" })
    }
}

module.exports = {
    courseResolver
}