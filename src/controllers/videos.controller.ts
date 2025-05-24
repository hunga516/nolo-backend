import express from 'express';
import { createMuxAsset, createMuxLiveStream } from '../lib/mux.lib';
import { createVideo, readAllVideos, readVideoById, updateVideo } from '../db/video';

export const uploadController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const response = await createMuxAsset()
    res.json(response)
}

export const webhookController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    switch (req.body.type) {
        case 'video.asset.ready':
            break;
        case 'video.live_stream.created':
            const { id: muxPlayBackId } = req.body.data.playback_ids[0]
            const { stream_key: muxStreamKey } = req.body.data

            const muxPreviewUrl = `https://image.mux.com/${muxPlayBackId}/animated.gif`
            const muxThumbnailUrl = `https://image.mux.com/${muxPlayBackId}/thumbnail.png`

            await updateVideo(muxPlayBackId, {
                muxPreviewUrl,
                muxThumbnailUrl,
                muxStreamKey
            })
            break;
        default:
            break;
    }
}

export const createLiveStreamsController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { name, clerkId } = req.body
    try {
        const liveStream = await createMuxLiveStream()
        const muxPlayBackId = liveStream.playback_ids[0].id

        const newLiveStream = await createVideo({
            name,
            clerkId,
            muxPlayBackId,
            type: "livestream"
        })

        res.json(newLiveStream)
    } catch (error) {
        console.log();
        res.status(401)
    }
}

export const readAllVideosController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const allVideo = await readAllVideos()
        res.json({
            message: "lay all video thanh cong",
            videos: allVideo
        })
    } catch (error) {
        console.log(error);
        res.status(401)
    }
}

export const readVideoByIdController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { _id } = req.params
    try {
        const video = await readVideoById(_id)
        res.json({
            message: "lay all video thanh cong",
            video: video
        })
    } catch (error) {
        console.log(error);
        res.status(401)
    }
}
