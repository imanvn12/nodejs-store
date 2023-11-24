const socketIO = require("socket.io");

function initialaysSocket(httpServer) {
    const io = socketIO(httpServer, {
        cors: {
            origin: "*"
        }
    })
    return io
}

module.exports = {
    initialaysSocket
}