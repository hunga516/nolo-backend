import { Server } from 'socket.io'
import http from 'http'

let io: Server | null = null

export const initSocket = (server: http.Server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        }
    })

    const liveStreamNamespace = io.of('/live-stream')

    liveStreamNamespace.on('connection', (socket) => {
        const videoId = socket.handshake.query.videoId as string
        console.log(`User connected vào live stream ${videoId}`)
        socket.join(videoId)

        socket.on('create-message', (message) => {
            // socket.to(videoId).emit('receive-create-message', message)
            liveStreamNamespace.to(videoId).emit('receive-create-message', message)
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected khỏi live stream ${videoId}`)
        })
    })

    io.on('connection', (socket) => {
        console.log('a user connected')
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })

    return io
}

// Hàm emit sự kiện cho room videoId
export const emitToVideoRoom = (videoId: string, event: string, data: any) => {
    if (!io) {
        console.warn('Socket.io not initialized')
        return
    }
    io.of('/live-stream').to(videoId).emit(event, data)
}
