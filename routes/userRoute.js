const express = require("express");
const router  = express.Router();
const path = require("path");
const authController = require("../controllers/authController");


//Rendering pages on clicking buttons
router.get("/", (req, res ) => {
    return res.render("home");
});

router.get("/dashboard", (req, res ) => {
   return res.render("dashboard");
});
router.get("/addProduct", (req, res ) => {
   return res.render("addProduct");
});
router.get("/contact", (req, res ) => {
   return res.render("contact");
});
router.get("/signUp", (req, res ) => {
   return res.render("signUp");
});
router.get("/login", (req, res ) => {
   return res.render("login");
});


//handling signUp form
router.post("/signUp", authController.signUp);
//handling Login form
router.post("/login", authController.login);



module.exports = router;