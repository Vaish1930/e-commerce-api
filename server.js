import express from "express";
import cors from "cors";
import connectDb from "./db.js";
import authRouter from "./routes/auth.js";
import productRouter from "./routes/product.js";
import bookingRouter from "./routes/booking.js";
import orderRouter from "./routes/order.js";

const app = express();

app.use(express.json());
app.use(cors());

await connectDb();

app.get("/", (req, res) => res.json("E-Commerce"));
app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", bookingRouter);
app.use("/api", orderRouter);

app.listen(80, () => console.log("Listening on localhost : 80"));

// 7NnpyEGhwbmjrgmf
// 7NnpyEGhwbmjrgmf
