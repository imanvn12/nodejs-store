const { BlogModel } = require("../../model/blogs");
const { blogType } = require("../typeDef/blog.typedef");

const blog = {
    type: blogType,
    resolve: async () => {
        // console.log(await BlogModel.find({}).populate([{ path: "author" }]));
        return await BlogModel.find({}).populate([
            {path: "author"},
            {path: "category"},
            {path: "comments.writer"},
            {path: "comments.answers.writer"}
        ]);
    }
}

const a = "a";

module.exports = {
    blog
}