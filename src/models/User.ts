import { Schema, model } from "mongoose";
import { Iuser } from "../interface/user"

const userSchema = new Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String }
})


export default model<Iuser>('User', userSchema);