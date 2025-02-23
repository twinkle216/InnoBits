const express = require("express");
const router = express.Router();
const medController = require("../controllers/medController");
const user = require("../models/user");
const filterMedicines = require("../middlewares/filter");

//Rendering static pages
router.get("/home", (req, res) => {
  return res.render("home", {
    scsMsg: null,
    errMsg: null,
    user,
  });
});

router.get("/addProduct", (req, res) => {
  return res.render("addProduct", {
    scsMsg: null,
    errMsg: null,
  });
});

router.get("/productList", medController.updateProductList);

router.get("/dashboard", filterMedicines, medController.updateDashboard);

router.get("/contact", (req, res) => {
  return res.render("contact", {
    scsMsg: null,
    errMsg: null,
  });
});

router.get("/", (req, res) => {
  return res.render("signUp", {
    scsMsg: null,
    errMsg: null,
  });
});

router.get("/login", (req, res) => {
  return res.render("login", {
    scsMsg: null,
    errMsg: null,
    user,
  });
});

router.get("/about", (req, res) => {
  return res.render("about");
});

module.exports = router;
