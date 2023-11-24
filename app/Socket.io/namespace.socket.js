const { conversationModel } = require("../model/conversation");

module.exports = class NameSpaceSocketHandler {
    #io;
    constructor(io) {
        this.#io = io;
    }
    initConnection() {
        this.#io.on("connection", async (socket) => {
            const namespaces = await conversationModel.find({}, { title: 1, endpoint: 1, _id: 0 });
            socket.emit("namespaces", namespaces);
        })
    }
    async createNameSpacesConnection() {
        const namespaces = await conversationModel.find({}, { _id: 0 });

        for (const namespace of namespaces) {

            this.#io.of(`/${namespace.endpoint}`).on("connection", async (socket) => {

                const conversation = await conversationModel.findOne({ endpoint: namespace.endpoint }, { _id: 0 });
                socket.emit("roomsOfNamespace", conversation.rooms);
                socket.on("joinroom", async roomname => {
                    // console.log(roomname);
                    const lastroom = Array.from(socket.rooms)[1];
                    if (lastroom) {
                        return socket.leave(socket.rooms);
                    }
                    socket.join(roomname);
                    socket.emit("joinedroom", roomname);

                    socket.on("message", async data => {
                        const { message, endpoint, roomname, sender } = data;
                        console.log(data);
                        // const mesagss = await conversationModel.findOne({ "rooms.name": roomname }, { "rooms.$": 1 });
                        // console.log(mesagss.rooms[0].messages.forEach(ms => ms.message));
                        await conversationModel.updateOne({ endpoint, "rooms.name": roomname }, {
                            $push: {
                                "rooms.$.messages": {
                                    sender,
                                    message: message
                                }
                            }
                        })
                        socket.emit("dataMessage", data);
                    })
                    socket.on("disconnect", async () => {
                        await this.getOnlineUsers(namespace.endpoint, roomname);
                    })
                    await this.getOnlineUsers(namespace.endpoint, roomname);
                })

            });
        }
    }

    async getOnlineUsers(endpoint, room) {
        const onlineusers = await this.#io.of(`/${endpoint}`).in(room).allSockets();
        const countOfOnlineUsers = Array.from(onlineusers).length;

        this.#io.of(endpoint).in(room).emit("onlineusers", countOfOnlineUsers);
    }

}