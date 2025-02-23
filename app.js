require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = 8000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const staticRoutes = require("./routes/staticRoutes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//to show frontend
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

//base entering route
app.use("/",staticRoutes, userRoutes);

//Connecting mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/innoBits")
  .then(() => console.log("mongoDB connected..."))
  .catch((err) => {
    console.log(err);
  });

//starting app
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
