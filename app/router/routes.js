
const { graphqlHTTP } = require('express-graphql');
const { checkPermissions } = require('../http/middlewares/permission.guard');
const { verifyAccessToken } = require('../http/middlewares/vrifyAccssecToken');
const { categoryAdminRoutes } = require('./admin/admin.routes');
const { apiRouter } = require('./api');
const { developerRoutes } = require('./developers.routes');
const { authRouter } = require('./user/auth');
const { graphqlConfig } = require('../utils/graphql.config');
const { graphqlSchema } = require('../graphQL/index.resolver');
const { paymentApi } = require('./api/payment');

const router = require('express').Router();

router.use('/', apiRouter);
router.use('/graphql', graphqlHTTP(graphqlConfig))
// router.use('/graphql', graphqlHTTP(graqlHttp));
// router.use("/graphql2", graphqlHTTP(function(req, res) {
//     return {
//         schema: graphqlSchema,
//         graphiql: true,
//         context: {req, res}
//     }

// }))
router.use('/developer', developerRoutes);
router.use('/admin', verifyAccessToken, checkPermissions(["user"]), categoryAdminRoutes);
router.use('/user', authRouter);
router.use("/payment", paymentApi)

module.exports = {
    allRoutes: router
}