const { RoomController } = require("../../http/controllers/soppurt/room.controller");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post("/addroom", uploadFile.any("image"), RoomController.addRoom);
router.get("/rooms", RoomController.getListOfRooms);

module.exports = {
    roomRouter: router
}