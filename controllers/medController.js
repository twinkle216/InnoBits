const Medicine = require("../models/medicine");

//adding new medicine to db
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
      return res.status(400).send("Medicine already registered!");
    }

    const medicine = new Medicine(req.body);
    console.log(req.body);
    await medicine.save();

    res.redirect("/home");
  } catch (error) {
    res.send("Error :" + error.message);
  }
};

const updateTablets = async (req, res) => {
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
    const medicine = await Medicine.findById;
    if (
      req.time1 == currentTime ||
      req.time2 == currentTime ||
      req.time3 == currentTime
    ) {
      Medicine.numberOfTablet -= doseQuantity;
      Medicine.findOneAndUpdate(
        { numberOfTablet: Medicine.numberOfTablet },
        { $set: { numberOfTablet: req.body.numberOfTablet } }
      );
    }
  } catch (err) {
    console.log(err);
  }
};
