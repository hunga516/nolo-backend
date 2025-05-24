import { createLiveStreamsController, readAllVideosController, readVideoByIdController, uploadController, webhookController } from '../controllers/videos.controller';
import express, { Request, Response, NextFunction } from 'express';


export default function videosRouter(router: express.Router) {
    router.post('/videos', uploadController)
    router.post('/videos/webhook', webhookController)
    router.post('/videos/live-streams', createLiveStreamsController)
    router.get('/videos', readAllVideosController)
    router.get('/videos/:_id', readVideoByIdController)
}
