"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideo = exports.readVideoById = exports.readAllVideos = exports.createVideo = exports.VideoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const VideoSchema = new mongoose_1.default.Schema({
    name: { type: String, default: "Tieu de mac dinh" },
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    clerkId: { type: String },
    muxPlayBackId: { type: String },
    muxStreamKey: { type: String },
    // muxDuration:
    muxPreviewUrl: { type: String },
    muxThumbnailUrl: { type: String },
    type: { type: String, enum: ["video", "livestream"], default: "video" }
}, {
    timestamps: true
});
exports.VideoModel = mongoose_1.default.model('Video', VideoSchema);
const createVideo = async (video) => {
    const newVideo = new exports.VideoModel(video);
    await newVideo.save();
    return newVideo;
};
exports.createVideo = createVideo;
const readAllVideos = async () => {
    return exports.VideoModel.find().lean();
};
exports.readAllVideos = readAllVideos;
const readVideoById = async (_id) => {
    return exports.VideoModel.findById(_id);
};
exports.readVideoById = readVideoById;
const updateVideo = async (muxPlayBackId, body) => {
    return exports.VideoModel.findOneAndUpdate({ muxPlayBackId }, body, { new: true });
};
exports.updateVideo = updateVideo;
//# sourceMappingURL=video.js.map