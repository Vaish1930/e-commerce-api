import mongoose from "mongoose";

const mongooseOptions = {
  type: String,
  required: true,
};

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    orderItems: [
      {
        title: mongooseOptions,
        price: mongooseOptions,
        quantity: mongooseOptions,
      },
    ],
    total: mongooseOptions,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
