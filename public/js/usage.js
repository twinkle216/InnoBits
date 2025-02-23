function updateUsage(medicineId) {
    fetch(`/medicine/${medicineId}/update-usage`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload();
    })
    .catch(err => console.error("Error updating usage:", err));
}
