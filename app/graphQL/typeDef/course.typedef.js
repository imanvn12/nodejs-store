const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const { authortype } = require("./public.typedef");
const { categories } = require("./ctegory.typedef");


const episode = new GraphQLList(new GraphQLObjectType({
    name: "episode",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        video: { type: GraphQLString },
        type: { type: GraphQLString },
        videoaddress: { type: GraphQLString },
    }
}))

const chapter = new GraphQLList(new GraphQLObjectType({
    name: "chapter",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        episodes: { type: episode },
    }
}))


const courses = new GraphQLList(new GraphQLObjectType({
    name: "courses",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        shortdescription: { type: GraphQLString },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        category: { type: categories },
        price: { type: GraphQLInt },
        type: { type: GraphQLString },
        format: { type: GraphQLString },
        teacher: { type: authortype },
        imageurl: { type: GraphQLString },
        totaltime: { type: GraphQLString },
        chapters: { type: chapter },
    }
}))

module.exports = {
    courses
}