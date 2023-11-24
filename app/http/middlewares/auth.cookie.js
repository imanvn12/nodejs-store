const { signedCookies } = require("cookie-parser");
const { userModel } = require("../../model/users");

async function checkLogin(req, res, next) {
    try {
        const token = await req.signedCookies["authorization"];
        if (token) {
            const user = await userModel.findOne({ token });
            if (user) {
                req.user = user;
                return next();
            }
        }
        return res.render("login", {
            error: "Invalid authorization token login to your account"
        });
    } catch (error) {
        next(error);
    }
}

async function loginUser(req, res, next) {
    try {
        const token = await req.signedCookies["authorization"];
        if (token) {
            const user = await userModel.findOne({ token });
            if (user) {
                req.user = user;
                return res.redirect("/support");
            }
        }
        return res.render("login", {
            error: "difsgjiopger"
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    checkLogin,
    loginUser
}