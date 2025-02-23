window.onload = () => {
    document.querySelectorAll('[id^="alarmSound-"]').forEach(audio => {
        const medId = audio.id.split('-')[1];
        const btn = document.getElementById(`doseBtn-${medId}`);

        const isTaken = localStorage.getItem(`doseTaken-${medId}`);

        if (isTaken === "true") {
            btn.innerText = "Taken";
            btn.style.backgroundColor = '#2ecc71';
        } else if (btn && btn.innerText.trim() === "Take Dose") {
            audio.play();

            const flashInterval = setInterval(() => {
                btn.style.backgroundColor = btn.style.backgroundColor === 'red' ? 'indigo' : 'red';
            }, 500);

            btn.dataset.flashInterval = flashInterval;
        }
    });
};

function stopAlarmAndUpdate(medId) {
    const audio = document.getElementById(`alarmSound-${medId}`);
    const btn = document.getElementById(`doseBtn-${medId}`);

    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    if (btn && btn.dataset.flashInterval) {
        clearInterval(btn.dataset.flashInterval);
        btn.style.backgroundColor = 'green';
        btn.innerText = 'Taken';

        localStorage.setItem(`doseTaken-${medId}`, "true");
    }

    //Updating backend to store "Taken" status
    fetch(`/taken/${medId}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: "Taken" })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Dose Taken!");
        } else {
            alert("Failed to update status.");
        }
    })
    .catch(error => console.error("Error:", error));
}
