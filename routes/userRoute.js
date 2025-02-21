const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authCheck");
const medController = require("../controllers/medController");

//Rendering pages on clicking buttons
router.get("/home", (req, res) => {
  return res.render("home");
});

router.get("/dashboard", authenticate, (req, res) => {
  return res.render("dashboard", { user: req.user });
});
router.get("/addProduct", (req, res) => {
  return res.render("addProduct");
});
router.get("/productList", (req, res) => {
  return res.render("productList");
});
router.get("/contact", (req, res) => {
  return res.render("contact");
});
router.get("/", (req, res) => {
  return res.render("signUp");
});
router.get("/login", (req, res) => {
  return res.render("login");
});
router.get("/about", (req, res) => {
  return res.render("about");
});

//handling signUp form
router.post("/signUp", authController.signUp);
//handling Login form
router.post("/login", authController.login);

//handling medicine register
router.post("/register", medController.addMedicine);





module.exports = router;
