const socketIo = require('socket.io');

// This function will accept the HTTP server and initialize Socket.IO
let io;

function initSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
        }
    });
    return io;
}

// Function to broadcast a message to all connected clients
async function broadcastMessage(message) {
    if (io) {
        io.emit('updated', message); // Emit to all clients
    } else {
        console.log("Socket.IO is not initialized");
    }
}

module.exports = {
    initSocket, broadcastMessage
};
