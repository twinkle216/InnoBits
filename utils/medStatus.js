const checkMedStatus = (medicines) => {
  try {
      const now = new Date();

      return medicines.map((med) => {
          // If already marked as Taken, don't change 
          if (med.status === "Taken") {
              return { ...med };
          }

          const times = [med.time1, med.time2, med.time3].filter(Boolean);
          let status = "Upcoming";

          for (let timeStr of times) {
              const [hours, minutes] = timeStr.split(":").map(Number);
              const doseTime = new Date();
              doseTime.setHours(hours, minutes, 0, 0);

              const diffHours = (now - doseTime) / (1000 * 60 * 60);

              if (diffHours >= 0 && diffHours <= 2) {
                  status = "Take Dose";
                  break;
              } else if (diffHours > 2) {
                  status = "Missed!";
              }
          }

          return { ...med, status };
      });
  } catch (err) {
      console.log("Error in checkMedStatus:", err);
      return [];
  }
};

module.exports = checkMedStatus;
