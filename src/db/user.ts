import * as mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    clerkId: { type: String },
    imageUrl: { type: String },
    name: { type: String },
    subscriberCount: { type: Number, default: 0 },
    isSubscriberSubscribed: { type: Boolean },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
    },
})

export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () => UserModel.find()
export const getUserByUsername = (username: string) =>
    UserModel.findOne({ username })
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserById = (id: string) => UserModel.findById(id)
export const createUser = (user: Record<string, any>) =>
    new UserModel(user).save().then((user) => user.toObject())
export const updateUser = (id: string, { email }: Record<string, any>) =>
    UserModel.findByIdAndUpdate(id, { email }, { new: true })
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id)
export const readUserByClerkId = (clerkId: string) => {
    return UserModel.findOne({ clerkId })
}