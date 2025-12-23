"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMuxLiveStream = exports.createMuxAsset = void 0;
const mux_node_1 = __importDefault(require("@mux/mux-node"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mux = new mux_node_1.default({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
});
const createMuxAsset = async () => {
    const asset = await mux.video.assets.create({
        inputs: [{ url: 'https://storage.googleapis.com/muxdemofiles/mux-video-intro.mp4' }],
        playback_policy: ['public'],
    });
    return asset;
};
exports.createMuxAsset = createMuxAsset;
const createMuxLiveStream = async () => {
    const liveStream = await mux.video.liveStreams.create({
        playback_policy: ['public'],
        new_asset_settings: { playback_policy: ['public'] },
    });
    return liveStream;
};
exports.createMuxLiveStream = createMuxLiveStream;
//# sourceMappingURL=mux.lib.js.map