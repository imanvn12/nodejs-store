const { signedCookie } = require("cookie-parser");
const Controller = require("../controller");
const jwt = require("jsonwebtoken");
const { userModel } = require("../../../model/users");
const { verifyAccessToken } = require("../../middlewares/vrifyAccssecToken");
const { SECRET_KEY } = require("../../../utils/SECRET_KEYS.JS");
const { findAccessToken } = require("../../middlewares/functions");

class ChatSoppurtController extends Controller {
    async renderTemplate(req, res, next) {
        try {
            return res.render("chat")
        } catch (error) {
            next(error)
        }
    }
    async loginForm(req, res, next) {
        try {
            return res.render("login", {
                error: undefined
            })
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const { mobile } = req.body;
            const user = await userModel.findOne({phone: mobile});
            if (!user) {
                return res.render("login", {
                    error: "login to your account"
                })
            }
            const token = await findAccessToken(user.phone);
            user.token = token;
            user.save();
            res.cookie("authorization", token, { signed: true, httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });
            return res.redirect("/support");
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    ChatSoppurtController: new ChatSoppurtController()
}