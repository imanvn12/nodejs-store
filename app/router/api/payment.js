const { paymentController } = require("../../http/controllers/api/payment.controller");
const { verifyAccessToken } = require("../../http/middlewares/vrifyAccssecToken");

const router = require("express").Router();

router.post('/basketpayment', verifyAccessToken, paymentController.BasketPayGateway);
router.post('/basketpaymentverify', verifyAccessToken, paymentController.BasketPayGatewayVerify);

// payment:
//  1- without intermediate
//      1- payment
//      2- check transaction
//      3- verify transaction
//      expample: Shaparak - Melat Bank - Pasargad
//  2- with intermediate
//      1- payment
//      2- verify payment
//      expample: Zarinpal

module.exports = {
    paymentApi : router
}