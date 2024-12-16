const REQUIRED_PERCENTAGE = 75.0;

function calculatePercentage(attended, total) {
    return (attended / total) * 100;
}

function calculateAdditionalClasses(totalClasses, attendedClasses, requiredPercentage) {
    let requiredAttendedClasses = (requiredPercentage / 100) * totalClasses;
    let additionalClasses = 0;

    while (((attendedClasses + additionalClasses) / (totalClasses + additionalClasses)) * 100 < requiredPercentage) {
        additionalClasses++;
    }

    return additionalClasses;
}

function displayResults(currentPercentage, additionalClasses) {
    const resultSection = document.getElementById('resultSection');
    const actionSection = document.getElementById('actionSection');
    const currentPercentageElem = document.getElementById('currentPercentage');
    const attendanceMessageElem = document.getElementById('attendanceMessage');

    currentPercentageElem.textContent = `➟ Current Attendance: ${currentPercentage.toFixed(2)}%`;

    if (currentPercentage < REQUIRED_PERCENTAGE) {
        attendanceMessageElem.innerHTML = `➟ Your attendance is below the required 75.00%.<br>➟ You need to attend at least ${additionalClasses} more class(es) to meet the required attendance.`;
        actionSection.classList.remove('hidden');
    }
    else {
        attendanceMessageElem.textContent = '❖ You meet the required attendance threshold of 75.00%.';
    }

    resultSection.classList.remove('hidden');
}

document.getElementById('calculateBtn').addEventListener('click', () => {
    const totalClasses = parseInt(document.getElementById('totalClasses').value);
    const attendedClasses = parseInt(document.getElementById('attendedClasses').value);

    if (isNaN(totalClasses) || totalClasses <= 0 || isNaN(attendedClasses) || attendedClasses < 0 || attendedClasses > totalClasses) {
        alert('Invalid input. Please enter valid values.');
        return;
    }

    const currentPercentage = calculatePercentage(attendedClasses, totalClasses);
    const additionalClasses = calculateAdditionalClasses(totalClasses, attendedClasses, REQUIRED_PERCENTAGE);

    displayResults(currentPercentage, additionalClasses);
});

document.getElementById('missedSessionBtn').addEventListener('click', () => {
    const missedDays = prompt("Enter the number of sessions you plan to miss:");

    if (isNaN(missedDays) || missedDays < 0) {
        alert('Invalid number of missed sessions');
        return;
    }

    const totalClasses = parseInt(document.getElementById('totalClasses').value);
    const attendedClasses = parseInt(document.getElementById('attendedClasses').value);
    let newClassesAttended = attendedClasses - missedDays;

    if (newClassesAttended < 0) newClassesAttended = 0;

    const newPercentage = calculatePercentage(newClassesAttended, totalClasses);
    const message = newPercentage >= REQUIRED_PERCENTAGE ? '❖ You will remain eligible for examination.' : '❖ You will no longer meet the required attendance criteria.';

    document.getElementById('finalMessage').textContent = `New Attendance Percentage: ${newPercentage.toFixed(2)}% - ${message}`;
    document.getElementById('final-result').classList.remove('hidden');
});

document.getElementById('additionalSessionBtn').addEventListener('click', () => {
    const additionalClasses = prompt("Enter the number of additional sessions you plan to attend:");

    if (isNaN(additionalClasses) || additionalClasses < 0) {
        alert('Invalid number of additional sessions');
        return;
    }

    const totalClasses = parseInt(document.getElementById('totalClasses').value);
    const attendedClasses = parseInt(document.getElementById('attendedClasses').value);
    const newTotalClasses = totalClasses + parseInt(additionalClasses);
    const newAttendedClasses = attendedClasses + parseInt(additionalClasses);

    const updatedPercentage = calculatePercentage(newAttendedClasses, newTotalClasses);
    const additionalClassesNeeded = calculateAdditionalClasses(newTotalClasses, newAttendedClasses, REQUIRED_PERCENTAGE);

    let message;
    if (updatedPercentage >= REQUIRED_PERCENTAGE) {
        message = '🎉 You have reached the required attendance!';
    } else {
        message = `❖ You still need to attend ${additionalClassesNeeded} more class(es) to meet the 75% attendance requirement.`;
    }

    document.getElementById('finalMessage').innerHTML = `❖ New Attendance Percentage: ${updatedPercentage.toFixed(2)}% <br>${message}`;
    document.getElementById('final-result').classList.remove('hidden');
});
