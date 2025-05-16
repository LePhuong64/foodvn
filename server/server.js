import express from "express";
import cors from "cors";
require("dotenv").config();
import initRoutes from "./routes";
import connectDB from "./config/connectDB";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //đọc được những dữ liệu gửi từ form
app.use("/uploads", express.static("uploads"));

initRoutes(app);
connectDB();

const port = process.env.PORT || 8000;
const listener= app.listen(port, () => {
  console.log("Server is running on port", listener.address().port);
});
