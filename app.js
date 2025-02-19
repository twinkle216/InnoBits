const express = require("express");
const path = require("path");
const PORT = 8000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//base entering route
app.use("/", userRoutes);

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
