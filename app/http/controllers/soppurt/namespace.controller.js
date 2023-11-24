const { StatusCodes } = require("http-status-codes");
const { conversationModel } = require("../../../model/conversation");
const Controller = require("../controller");
const createHttpError = require("http-errors");

class NameSpaceController extends Controller {
    async addNameSpace(req, res, next) {
        try {
            const { title, endpoint } = req.body;
            await this.findoneNameSpace(endpoint);
            await conversationModel.create({ title, endpoint });
            return res.status(StatusCodes.CREATED).json({
                statuscode: StatusCodes.CREATED,
                data: {
                    message: "NameSpace created successfully"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async getListOfNameSpaces(req, res, next) {
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
    async findoneNameSpace(endpoint) {
        const conversation = await conversationModel.findOne({ endpoint });
        if (conversation) throw createHttpError.BadRequest("this name space is already exists");
    }
}

module.exports = {
    NameSpaceController: new NameSpaceController()
}