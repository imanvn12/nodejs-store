const { ChatSoppurtController } = require("../../http/controllers/soppurt/soppurt.controller");
const  {checkLogin, loginUser}  = require("../../http/middlewares/auth.cookie");
const { messageRouter } = require("./message.routes");
const { namespaceRouter } = require("./namespace.routes");
const { roomRouter } = require("./room.routes");

const router = require("express").Router();

router.get("/", checkLogin, ChatSoppurtController.renderTemplate);
router.get("/login", loginUser, ChatSoppurtController.loginForm);
router.post("/login", ChatSoppurtController.login);
router.use("/", namespaceRouter);
router.use("/", roomRouter);
router.use("/", messageRouter);

module.exports = {
    chatSoppurtRputes: router
}