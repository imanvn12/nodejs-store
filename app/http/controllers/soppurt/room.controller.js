const { StatusCodes } = require("http-status-codes");
const { conversationModel } = require("../../../model/conversation");
const Controller = require("../controller");
const createHttpError = require("http-errors");
const path = require("path");

class RoomController extends Controller {
    async addRoom(req, res, next) {
        try {
            const { name, description, endpoint } = req.body;
            await this.findOneNameSpace(endpoint);
            await this.findOneroom(name);
            // const image = path.join(req.body.imagepath, req.body.filename);
            // console.log(image);
            const data = {
                name,
                description,
                // image
            };
            const conversation = await conversationModel.updateOne(
                { endpoint },
                {
                    $push: {
                        rooms: data
                    }
                }
            );
            if (!conversation.modifiedCount) throw createHttpError.InternalServerError("couldn't create room");
            return res.status(StatusCodes.CREATED).json({
                statuscode: StatusCodes.CREATED,
                data: {
                    message: "room created successfully"
                }
            })
        } catch (error) {

            next(error);
        }
    }
    async getListOfRooms(req, res, next) {
        try {
            const conversation = await conversationModel.find({}, { rooms: 0 });
            return res.status(StatusCodes.OK).json({
                statuscode: StatusCodes.OK,
                data: {
                    conversation
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async findOneNameSpace(endpoint) {
        const conversation = await conversationModel.findOne({ endpoint });
        console.log(conversation);
        if (!conversation) throw createHttpError.NotFound("nameSpace not found");
        return conversation
    }
    async findOneroom(name) {
        const conversation = await conversationModel.findOne({ "rooms.name": name });
        if (conversation) throw createHttpError.NotFound("this room is already exists");
    }
}

module.exports = {
    RoomController: new RoomController()
}