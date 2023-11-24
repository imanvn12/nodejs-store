const { NameSpaceController } = require("../../http/controllers/soppurt/namespace.controller");

const router = require("express").Router();

router.post("/addnamespace", NameSpaceController.addNameSpace);
router.get("/namepaces", NameSpaceController.getListOfNameSpaces);

module.exports = {
    namespaceRouter: router
}