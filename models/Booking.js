import mongoose from "mongoose";

const mongooseOptions = {
  type: String,
  required: true,
};

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    date: mongooseOptions,
    time: mongooseOptions,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);
