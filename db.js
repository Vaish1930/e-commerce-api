import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const dbURI = `mongodb+srv://root:7NnpyEGhwbmjrgmf@cluster0.owvze.mongodb.net/ecommerce?retryWrites=true&w=majority`;

    const conn = await mongoose.connect(dbURI, { autoIndex: false });
    console.log(`mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`error connecting database ${error}`);
  }
};

export default connectDb;
