import mongoose from 'mongoose'

const CounterSchema = new mongoose.Schema({
    model: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
})

export const CounterModel = mongoose.model('Counter', CounterSchema)
