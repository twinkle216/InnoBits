const UserMessage = require("../models/contact");

exports.formSubmission = async (req, res) => {
  const { username, email, subject, message } = req.body;

  try {
    const userMessage = new UserMessage(req.body);
    await userMessage.save();
    res.render("home", {
      scsMsg: "Form has been submitted successfully!",
      errMsg: null,
    });
  } catch (error) {
    res.render("contact", {
      scsMsg: null,
      errMsg: "Try again something went wrong!",
    });
    console.log(error);
  }
};
