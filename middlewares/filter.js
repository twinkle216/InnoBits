const checkMedStatus = require("../utils/medStatus");
const Medicine = require("../models/medicine");

//to filter out medicines to show on dashboard
const filterMedicines = async (req, res, next) => {
  try {
    const medicines = await Medicine.find().lean();
    const checkedMed = checkMedStatus(medicines);
    // res.render("dashboard", { Medicines: topTwoMed });
    req.checkedMed = checkedMed;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = filterMedicines;