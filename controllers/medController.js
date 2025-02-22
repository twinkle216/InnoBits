const res = require("express/lib/response");
const Medicine = require("../models/medicine");

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
      return res.status(400).send("Medicine already registered!");
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
exports.updateTable = async (req, res) => {
  try {
    const medicines = await Medicine.find();

    const formattedDateMed = medicines.map((med) => {
      if (med.expiryDate) {
        const date = new Date(med.expiryDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);

        return {
          ...med._doc,
          expiryDate: `${day}/ ${month}/ ${year}`,
        };
      }
      return med;
    });
    res.render("productList", { Medicines: formattedDateMed });
  } catch (err) {
    console.log(err);
  }
};

//Checking dose status taken or not or closest time of dose etc.
exports.checkMedStatus = (medicines) => {
  try {
    const now = new Date();

    return medicines.map((med) => {
      const times = [med.time1, med.time2, med.time3];
      let status = "No Dose";

      for (let timeStr of times) {
        const [hours, minutes] = timeStr.split(":").map(Number);
        const doseTime = new Date();
        doseTime.setHours(hours, minutes, 0, 0);

        const diffHours = (now - doseTime) / (1000 * 60 * 60); // Difference in hours

        if (diffHours >= 0 && diffHours <= 2) {
          status = "Take Dose";
          break;
        } else if (diffHours > 2) {
          status = "Missed! Be careful";
        } else if (diffHours < 0 && Math.abs(diffHours) <= 2) {
          status = "Upcoming";
          break;
        }
      }

      return { ...med, status };
    });
  } catch (err) {
    console.log(err);
  }
};

//to filter out medicines to show on dashboard
exports.filterMedicines = (req, res) => {
  try {
    const checkedMed = medController.checkMedStatus(Medicines);
    const topTwoMed = checkedMed
      .filter((med) => med.status !== "No Dose")
      .slice(0, 2);
    res.render("dashboard", { Medicines: topTwoMed });
  } catch (error) {
    console.log(err);
  }
};

// const updateTablets = async (req, res) => {
//   const {
//     name,
//     numberOfTablet,
//     doseQuantity,
//     expiryDate,
//     time1,
//     time2,
//     time3,
//   } = req.body;

//   try {
//     const medicine = await Medicine.findById;
//     if (
//       req.time1 == currentTime ||
//       req.time2 == currentTime ||
//       req.time3 == currentTime
//     ) {
//       Medicine.numberOfTablet -= doseQuantity;
//       Medicine.findOneAndUpdate(
//         { numberOfTablet: Medicine.numberOfTablet },
//         { $set: { numberOfTablet: req.body.numberOfTablet } }
//       );
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
