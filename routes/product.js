import { Router } from "express";
import Product from "../models/Product.js";
import { verifyToken } from "../utils.js";

const router = Router();

router.post("/products/create", verifyToken, async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json(`Something went wrong : ${error}`);
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(`Something went wrong : ${error}`);
  }
});

router.patch("/products/update/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json(`Product not found`);
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(`Something went wrong : ${error}`);
  }
});

router.delete("/products/delete/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json(`Product not found`);
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json(`Something went wrong : ${error}`);
  }
});

export default router;
