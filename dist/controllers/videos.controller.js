"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readVideoByIdController = exports.readAllVideosController = exports.createLiveStreamsController = exports.webhookController = exports.uploadController = void 0;
const mux_lib_1 = require("../lib/mux.lib");
const video_1 = require("../db/video");
const socket_1 = require("../socket");
const uploadController = async (req, res, next) => {
    const response = await (0, mux_lib_1.createMuxAsset)();
    res.json(response);
};
exports.uploadController = uploadController;
const webhookController = async (req, res, next) => {
    switch (req.body.type) {
        case 'video.asset.ready':
            break;
        case 'video.live_stream.created':
            const { id: muxPlayBackId } = req.body.data.playback_ids[0];
            const { stream_key: muxStreamKey } = req.body.data;
            const muxPreviewUrl = `https://image.mux.com/${muxPlayBackId}/animated.gif`;
            const muxThumbnailUrl = `https://image.mux.com/${muxPlayBackId}/thumbnail.png`;
            await (0, video_1.updateVideo)(muxPlayBackId, {
                muxPreviewUrl,
                muxThumbnailUrl,
                muxStreamKey
            });
            const io = (0, socket_1.getIo)();
            io.emit('create-livestream', muxStreamKey);
            break;
        default:
            break;
    }
};
exports.webhookController = webhookController;
const createLiveStreamsController = async (req, res, next) => {
    const { name, clerkId } = req.body;
    try {
        const liveStream = await (0, mux_lib_1.createMuxLiveStream)();
        const muxPlayBackId = liveStream.playback_ids[0].id;
        const newLiveStream = await (0, video_1.createVideo)({
            name,
            clerkId,
            muxPlayBackId,
            type: "livestream"
        });
        res.json(newLiveStream);
    }
    catch (error) {
        console.log();
        res.status(401);
    }
};
exports.createLiveStreamsController = createLiveStreamsController;
const readAllVideosController = async (req, res, next) => {
    try {
        const allVideo = await (0, video_1.readAllVideos)();
        res.json({
            message: "lay all video thanh cong",
            videos: allVideo
        });
    }
    catch (error) {
        console.log(error);
        res.status(401);
    }
};
exports.readAllVideosController = readAllVideosController;
const readVideoByIdController = async (req, res, next) => {
    const { _id } = req.params;
    try {
        const video = await (0, video_1.readVideoById)(_id);
        res.json({
            message: "lay all video thanh cong",
            video: video
        });
    }
    catch (error) {
        console.log(error);
        res.status(401);
    }
};
exports.readVideoByIdController = readVideoByIdController;
//# sourceMappingURL=videos.controller.js.map