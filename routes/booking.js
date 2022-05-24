import { Router } from "express";

import Booking from "../models/Booking.js";
import { verifyToken } from "../utils.js";

const router = Router();

router.post("/booking/create", verifyToken, async (req, res) => {
  try {
    const book = new Booking({ ...req.body, userId: req.user._id });
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

router.get("/bookings", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate(
      "userId",
      "-__v -password"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

router.patch("/booking/update/:id", verifyToken, async (req, res) => {
  try {
    const { date, time } = req.body;
    const book = await Booking.findById(req.params.id);

    const userId = req.user._id;
    if (userId !== book.userId.toString())
      return res.status(404).json(`You can't update the booking`);

    if (date) book.date = date;
    if (time) book.time = time;

    const updatedBooking = await book.save();
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

router.delete("/booking/delete/:id", verifyToken, async (req, res) => {
  try {
    const book = await Booking.findById(req.params.id);

    const userId = req.user._id;
    if (userId !== book.userId.toString())
      return res.status(404).json(`You can't delete the booking`);

    const deletedBooking = await Booking.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(deletedBooking);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

export default router;
