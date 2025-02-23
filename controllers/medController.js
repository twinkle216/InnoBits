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

    const formattedDateMed = formatMed(checkedMed);
    res.render("productList", { Medicines: formattedDateMed });
  } catch (err) {
    console.log(err);
  }
};

exports.updateInventory = (req, res) => {
  try {
    const topTwoMed = req.checkedMed
      .filter((med) =>
        med.status !== "Upcoming" ? true : med.status == "Upcoming"
      )
      .slice(0, 2);

    const formattedDateMed = formatMed(topTwoMed);
    res.render("dashboard", { Medicines: formattedDateMed });
  } catch (err) {
    console.log(err);
  }
};

//after taking medicine update Quantity in database
exports.updateMedAmount = async (req, res) => {
  try {
    const { status } = req.body;  // Should be "Upcoming"
    const medId = req.params.id;

    const medicine = await Medicine.findById(medId);
    if (!medicine) {
      return res.status(404).json({ success: false, message: "Medicine not found" });
    }

    const doseQuantity = Number(medicine.doseQuantity) || 0;
    const currentTablets = Number(medicine.numberOfTablets) || 0;

    if (currentTablets < doseQuantity) {
      return res.json({ success: false, message: "Medicine is out of stock!" });
    }

    // Updating both status and numberOfTablets
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      medId,
      {
        $set: { status: status },
        $inc: { numberOfTablets: -doseQuantity }
      },
      { new: true } // Ensures the updated document is returned
    );

    res.json({ success: true, updatedMedicine });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};


