import mongoose from "mongoose";

const mongooseOptions = {
  type: String,
  required: true,
};

const productSchema = new mongoose.Schema(
  {
    title: mongooseOptions,
    price: mongooseOptions,
    imageUrl: mongooseOptions,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
