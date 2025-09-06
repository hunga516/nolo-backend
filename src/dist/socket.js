"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIo = exports.emitToVideoRoom = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io = null;
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.NEXT_FRONTEND_URL,
            methods: ["GET", "POST"],
            credentials: true,
        }
    });
    const liveStreamNamespace = io.of('/live-stream');
    liveStreamNamespace.on('connection', (socket) => {
        const videoId = socket.handshake.query.videoId;
        console.log(`User connected vào live stream ${videoId}`);
        socket.join(videoId);
        socket.on('create-message', ({ messageSend, userSendImage }) => {
            // socket.to(videoId).emit('receive-create-message', message)
            // console.log(userSendImage);
            liveStreamNamespace.to(videoId).emit('receive-create-message', { messageSend, userSendImage });
        });
        socket.on('disconnect', () => {
            console.log(`User disconnected khỏi live stream ${videoId}`);
        });
    });
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
    return io;
};
exports.initSocket = initSocket;
// Hàm emit sự kiện cho room videoId
const emitToVideoRoom = (videoId, event, data) => {
    if (!io) {
        console.warn('Socket.io not initialized');
        return;
    }
    io.of('/live-stream').to(videoId).emit(event, data);
};
exports.emitToVideoRoom = emitToVideoRoom;
const getIo = () => {
    if (!io) {
        throw new Error('Socket.io chưa được khởi tạo');
    }
    return io;
};
exports.getIo = getIo;
//# sourceMappingURL=socket.js.map