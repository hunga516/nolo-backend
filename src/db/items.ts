import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    imageUrl: {type: String}
}, {
    timestamps: true
})

export const ItemModel =  mongoose.model('Item', ItemSchema)


