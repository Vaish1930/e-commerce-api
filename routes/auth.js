import { Router } from "express";
import Auth from "../models/Auth.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const doesEmailExists = await Auth.findOne({ email });

    if (doesEmailExists)
      return res.status(400).json(`User with this ${email} already exists`);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new Auth({ ...req.body, password: hashedPassword });
    const createUser = await user.save();
    const token = generateToken(createUser);

    res.status(201).header("authToken", token).json({
      _id: createUser._id,
      userName: createUser.userName,
      email: createUser.email,
      phone: createUser.phone,
      token,
    });
  } catch (error) {
    res.status(500).json(`Something went wrong ,error : ${error}`);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const doesUserExists = await Auth.findOne({ email });

    if (!doesUserExists) return res.status(400).json(`Invalid email`);
    const isPasswordValid = await bcrypt.compare(
      password,
      doesUserExists.password
    );

    if (!isPasswordValid) return res.status(400).json(`Invalid password`);
    const token = generateToken(doesUserExists);

    res.status(201).header("authToken", token).json({
      _id: doesUserExists._id,
      userName: doesUserExists.userName,
      email: doesUserExists.email,
      phone: doesUserExists.phone,
      token,
    });
  } catch (error) {
    res.status(500).json(`Something went wrong ,error : ${error}`);
  }
});

export default router;
