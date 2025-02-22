const express = require("express");
const router = express.Router();


//Rendering static pages
router.get("/home", (req, res) => {
  return res.render("home");
});

router.get("/addProduct", (req, res) => {
  return res.render("addProduct");
});

router.get("/productList", (req, res) => {
  return res.render("productList");
});

router.get("/contact", (req, res) => {
  return res.render("contact", {
    scsMsg: null,
    errMsg: null,
  });
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

module.exports = router;
