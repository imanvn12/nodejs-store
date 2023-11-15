const { graphqlSchema } = require("../graphQL/index.resolver");

// function graqlHttp (req, res) {
//     return {
//         schema: graphqlSchema,
//         graphiql: true,
//         context: {req, res}
//     }
// }

// module.exports = {
//     graqlHttp
// }


function graphqlConfig(req, res) {
    return {
        schema: graphqlSchema,
        graphiql: true,
        context: { req, res }
    }
}

module.exports = {
    graphqlConfig
}