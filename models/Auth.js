import mongoose from "mongoose";

const mongooseOptions = {
  type: String,
  required: true,
};

const authSchema = new mongoose.Schema({
  userName: mongooseOptions,
  email: { ...mongooseOptions, unique: true },
  password: mongooseOptions,
  phone: mongooseOptions,
});

export default mongoose.model("Auth", authSchema);
