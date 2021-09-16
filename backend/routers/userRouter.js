import express from "express";
// import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get("/seed", async (req, res) => {
  // await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

userRouter.post("/signin", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
});

// userRouter.post("/register", (req, res) => {
//   User.find({ email: req.body.email }, (err, data) => {
//     if (data.length == 0) {
//       const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: bcrypt.hashSync(req.body.password, 8),
//       });
//       user.save((err, data) => {
//         if (err) {
//           res.status(400).json({
//             errorMessage: err,
//             status: false,
//           });
//         } else {
//           res.status(200).json({
//             status: true,
//             title: "Registered Successfully",
//             _id: data._id,
            // name: data.name,
//             email: data.email,
//             isAdmin: data.isAdmin,
//             token: generateToken(data),
//           });
//         }
//       });
//     } else {
//       res.status(400).json({
//         errorMessage: "User already exist",
//         status: false,
//       });
//     }
//   });
// });

userRouter.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const createdUser = await user.save();
  res.send({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    token: generateToken(createdUser),
  });
});

export default userRouter;
