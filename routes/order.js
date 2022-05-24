import { Router } from "express";

import Order from "../models/Order.js";
import { verifyToken } from "../utils.js";

const router = Router();

router.post("/orders/create", verifyToken, async (req, res) => {
  try {
    const order = new Order({ ...req.body, userId: req.user._id });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

router.get("/orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate(
      "userId",
      "-__v -password"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

router.patch("/orders/update/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json(`Order not found`);

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

router.delete("/orders/delete/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json(`Order not found`);

    const deletedOrder = await Order.findOneAndDelete({ _id: req.params.id });

    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

export default router;
