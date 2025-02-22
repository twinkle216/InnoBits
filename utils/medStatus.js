//Checking dose status taken or not or closest time of dose etc.
checkMedStatus = (medicines) => {
    try {
      const now = new Date();
  
      return medicines.map((med) => {
        const times = [med.time1, med.time2, med.time3];
        let status = "Upcoming";
  
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

module.exports = checkMedStatus;
