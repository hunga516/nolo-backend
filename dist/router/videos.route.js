"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = videosRouter;
const videos_controller_1 = require("../controllers/videos.controller");
function videosRouter(router) {
    router.post('/videos', videos_controller_1.uploadController);
    router.post('/videos/webhook', videos_controller_1.webhookController);
    router.post('/videos/live-streams', videos_controller_1.createLiveStreamsController);
    router.get('/videos', videos_controller_1.readAllVideosController);
    router.get('/videos/:_id', videos_controller_1.readVideoByIdController);
}
//# sourceMappingURL=videos.route.js.map