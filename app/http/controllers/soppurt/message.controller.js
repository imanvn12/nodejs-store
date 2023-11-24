const { StatusCodes } = require("http-status-codes");
const { conversationModel } = require("../../../model/conversation");
const Controller = require("../controller");

class messageController extends Controller{
    async addMessage(req, res, next) {
        try {
            const {title, endpoint} = req.body;
            const conversation = await conversationModel.create({title, endpoint});
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
    async getListOfMessages(req, res, next) {
        try {
            const conversation = await conversationModel.find({}, {rooms: 0});
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
}

module.exports = {
    messageController: new messageController()
}