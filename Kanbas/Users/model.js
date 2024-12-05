import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("UserModel", schema);
export const findAllUsers = () => model.find();
export default model;