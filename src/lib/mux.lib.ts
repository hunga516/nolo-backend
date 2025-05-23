import Mux from '@mux/mux-node';
import dotenv from 'dotenv'
dotenv.config()

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
});

export const createMuxAsset = async () => {
    const asset = await mux.video.assets.create({
        inputs: [{ url: 'https://storage.googleapis.com/muxdemofiles/mux-video-intro.mp4' }],
        playback_policy: ['public'],
    });

    return asset
}

export const createMuxLiveStream = async () => {
    const liveStream = await mux.video.liveStreams.create({
        playback_policy: ['public'],
        new_asset_settings: { playback_policy: ['public'] },
    });

    return liveStream
}