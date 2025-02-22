const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authCheck");
const medController = require("../controllers/medController");

router.get("/dashboard", authenticate, (req, res) => {
  return res.render("dashboard", { user: req.user });
});

//POST REQUESTS
router.post("/signUp", authController.signUp);

router.post("/login", authController.login);

router.post("/contact", contactController.formSubmission);

router.post("/register", medController.addMedicine);

module.exports = router;
