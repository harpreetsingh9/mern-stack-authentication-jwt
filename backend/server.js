import express from "express";
import mongoose from "mongoose";
// import bodyParser from "body-parser";
import userRouter from "./routers/userRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost/userlogin", {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongodb successfully connected"))
  .catch((err) => console.log(err));

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server at http://localhost:${port}`);
});
