import mongoose, { Document, Types } from "mongoose";

interface UserDocument extends Document {
    _id:Types.ObjectId,
    name:string,
    email:string,
    password:string
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export const UserModel = mongoose.model<UserDocument>("User", userSchema);