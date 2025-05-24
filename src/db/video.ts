import mongoose, { InferSchemaType } from "mongoose";

const VideoSchema = new mongoose.Schema({
    name: { type: String, default: "Tieu de mac dinh" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    clerkId: { type: String },
    muxPlayBackId: { type: String },
    muxStreamKey: { type: String },
    // muxDuration:
    muxPreviewUrl: { type: String },
    muxThumbnailUrl: { type: String },
    type: { type: String, enum: ["video", "livestream"], default: "video" }
}, {
    timestamps: true
})

export const VideoModel = mongoose.model('Video', VideoSchema)

export type VideoType = InferSchemaType<typeof VideoModel>

export const createVideo = async (video: VideoType) => {
    const newVideo = new VideoModel(video)
    await newVideo.save()

    return newVideo
}

export const readAllVideos = async () => {
    return VideoModel.find().lean()
}

export const readVideoById = async (_id: string) => {
    return VideoModel.findById(_id)
}

export const updateVideo = async (muxPlayBackId: string, body: Partial<VideoType>) => {
    return VideoModel.findOneAndUpdate({ muxPlayBackId }, body, { new: true })
}

