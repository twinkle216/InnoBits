const express = require("express");
const path = require("path");
const PORT = 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen("8000", () => {
    console.log(`server started at http://localhost:${PORT}`);
})


