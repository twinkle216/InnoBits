const res = require("express/lib/response");
const Medicine = require("../models/medicine");
const formatMed = require("../utils/formatMed");
const checkMedStatus = require("../utils/medStatus");
const medicine = require("../models/medicine");
//adding new medicine to Mongodb
exports.addMedicine = async (req, res) => {
  const {
    name,
    numberOfTablet,
    doseQuantity,
    expiryDate,
    time1,
    time2,
    time3,
  } = req.body;

  try {
    // Checking if medicine already registered
    const existingMedicine = await Medicine.findOne(req.body);

    if (existingMedicine) {
      res.render("addProduct", {
        scsMsg: null,
        errMsg: "Medicine already registered!",
      });
    }

    const medicine = new Medicine(req.body);
    await medicine.save();

    res.render("home", {
      scsMsg: "Medicine has been added successfully!",
      errMsg: null,
    });
  } catch (error) {
    console.log(error);
    res.render("addProduct", {
      scsMsg: null,
      errMsg: "Something went wrong. Try again!",
    });
  }
};

//Updating table when changing data in MongoDB
exports.updateProductList = async (req, res) => {
  try {
    const medicines = await Medicine.find().lean();
    const checkedMed = checkMedStatus(medicines);

    console.log(checkedMed);

    const formattedDateMed = formatMed(checkedMed);
    res.render("productList", { Medicines: formattedDateMed });
  } catch (err) {
    console.log(err);
  }
};

exports.updateDashboard = (req, res) => {
  try {
    const topTwoMed = req.checkedMed
      .filter((med) => med.status !== "No Dose")
      .slice(0, 2);

      console.log(topTwoMed);
      
      const formattedDateMed = formatMed(topTwoMed);
      console.log(formattedDateMed)
      res.render("dashboard", { Medicines: formattedDateMed });
      
  } catch (err) {
    console.log(err);
  }
};

//after taking medicine update Quantity in database
exports.updateMedAmount = (req, res) => {
  
}
