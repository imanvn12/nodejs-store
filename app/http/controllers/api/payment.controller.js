const { default: axios } = require("axios");
const { verifyAccessToken } = require("../../middlewares/vrifyAccssecToken");
const Controller = require("../controller");
const { funcgetUserBasket } = require("./../../../graphQL/query/user-profile.resolver");
const createHttpError = require("http-errors");
const { paymentmodel } = require("../../../model/payments");
const { invoiceNumberGenerator } = require("../../middlewares/functions");
const moment = require("moment-jalali");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
class paymentController extends Controller {
    async BasketPayGateway(req, res, next) {
        try {
            const user = req.user;
            const userbasket = await funcgetUserBasket(user._id);
            const zarinpalURL = "https://api.zarinpal.com/pg/v4/payment/request.json";
            const zarinpalGATEWAY = "https://www.zarinpal.com/pg/StartPay";
            const zarinpalOptions = {
                merchant_id: "merchant_id: owner has to this",
                amount: userbasket?.[0]?.allfinalprice?.allfinalprice,
                description: "پرداخت برای خرید محصولات و دوره ها",
                metadata: {
                    email: user.email || "vakylyaniman56@gmail.com",
                    mobile: user.phone
                },
                callback_url: "http://localhost:4000/payment/basketpaymentverify"
            }
            const RequestResult = await axios.post(zarinpalURL, zarinpalOptions).then(result => result.data);
            const { authority, code } = RequestResult?.data;

            await paymentmodel.create({
                invoiceNumber: invoiceNumberGenerator(),
                paymentdate: moment().format("YYYYMMDDHHmmssSSS"),
                user: user._id,
                authority,
                verify: false,
                description: zarinpalOptions.description,
                amount: zarinpalOptions.amount,
                basket: userbasket
            })
            if (code == 100) {
                return res.json({
                    code,
                    getwayURL: `${zarinpalGATEWAY}/${authority}`
                })
            }
            throw createHttpError.BadRequest("have an error to payment")
        } catch (error) {
            next(error);
        }
    }
    // =====================================================================================================
    async BasketPayGatewayVerify(req, res, next) {
        try {
            const { Authority: authority } = req.query
            const payment = await paymentmodel.findOne({ authority });
            if(!payment) throw createHttpError.NotFound("payment not found");
            if(payment.verify == true) throw createHttpError.BadRequest("payment has already verified");
            const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json";
            const bodyOptions = JSON.stringify({
                authority,
                amount: payment.amount,
                merchant_id: "i dont have"
            })
            const verifyOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: bodyOptions,
            }
            const verifyResult = await fetch(verifyURL, verifyOptions).then(result => result.json())

            return res.json({
                verifyResult
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    paymentController: new paymentController()
}