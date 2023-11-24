const { messageController } = require("../../http/controllers/soppurt/message.controller");

const router = require("express").Router();

router.post("/addmessage", messageController.addMessage);
router.get("/messages", messageController.getListOfMessages);

module.exports = {
    messageRouter: router
}