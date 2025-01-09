const REQUIRED_PERCENTAGE = 75.0;

const calculateBtn = document.getElementById('calculateBtn');
const resultSection = document.getElementById('resultSection');
const finalResult = document.getElementById('finalResult');
const percentageDisplay = document.getElementById('percentageDisplay');
const attendanceMessage = document.getElementById('attendanceMessage');
const missedSessionBtn = document.getElementById('missedSessionBtn');
const additionalSessionBtn = document.getElementById('additionalSessionBtn');
const progressBar = document.getElementById('progressBar');
const updatedProgressBar = document.getElementById('updatedProgressBar');
const updatedPercentageDisplay = document.getElementById('updatedPercentageDisplay');
const finalMessage = document.getElementById('finalMessage');

function calculatePercentage(attended, total) {
    return (attended / total) * 100;
}

function calculateAdditionalClasses(totalClasses, attendedClasses, requiredPercentage) {
    let additionalClasses = 0;
    while (((attendedClasses + additionalClasses) / (totalClasses + additionalClasses)) * 100 < requiredPercentage) {
        additionalClasses++;
    }
    return additionalClasses;
}

function updateProgressBar(percentage, barElement) {
    barElement.style.width = `${percentage}%`;
    barElement.style.backgroundColor = percentage >= REQUIRED_PERCENTAGE ? 'var(--secondary)' : 'var(--error)';
}

function displayResults(currentPercentage, additionalClasses) {
    percentageDisplay.textContent = `${currentPercentage.toFixed(2)}%`;
    updateProgressBar(currentPercentage, progressBar);

    if (currentPercentage < REQUIRED_PERCENTAGE) {
        attendanceMessage.innerHTML = `Your attendance is below the required ${REQUIRED_PERCENTAGE}%.<br>You need to attend at least ${additionalClasses} more class(es) to meet the required attendance.`;
        attendanceMessage.style.color = 'var(--error)';
    } else {
        attendanceMessage.textContent = `Congratulations! You meet the required attendance threshold of ${REQUIRED_PERCENTAGE}%.`;
        attendanceMessage.style.color = 'var(--secondary)';
    }

    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

calculateBtn.addEventListener('click', () => {
    const totalClasses = parseInt(document.getElementById('totalClasses').value);
    const attendedClasses = parseInt(document.getElementById('attendedClasses').value);

    if (isNaN(totalClasses) || totalClasses <= 0 || isNaN(attendedClasses) || attendedClasses < 0 || attendedClasses > totalClasses) {
        alert('Please enter valid values for total classes and attended classes.');
        return;
    }

    const currentPercentage = calculatePercentage(attendedClasses, totalClasses);
    const additionalClasses = calculateAdditionalClasses(totalClasses, attendedClasses, REQUIRED_PERCENTAGE);

    displayResults(currentPercentage, additionalClasses);
});

missedSessionBtn.addEventListener('click', () => {
    const totalClasses = parseInt(document.getElementById('totalClasses').value);
    const attendedClasses = parseInt(document.getElementById('attendedClasses').value);
    const missedDays = prompt("Enter the number of sessions you plan to miss:");

    if (missedDays === null) return;
    const missed = parseInt(missedDays);
    if (isNaN(missed) || missed < 0) {
        alert('Please enter a valid number of missed sessions.');
        return;
    }

    const newAttendedClasses = Math.max(0, attendedClasses - missed);
    const newPercentage = calculatePercentage(newAttendedClasses, totalClasses);

    updatedPercentageDisplay.textContent = `${newPercentage.toFixed(2)}%`;
    updateProgressBar(newPercentage, updatedProgressBar);

    const message = newPercentage >= REQUIRED_PERCENTAGE
        ? `You will remain eligible for examination.`
        : `You will no longer meet the required attendance criteria.`;

    finalMessage.innerHTML = `After missing ${missed} session(s), your new attendance percentage will be ${newPercentage.toFixed(2)}%.<br>${message}`;
    finalMessage.style.color = newPercentage >= REQUIRED_PERCENTAGE ? 'var(--secondary)' : 'var(--error)';

    finalResult.style.display = 'block';
    finalResult.scrollIntoView({ behavior: 'smooth' });
});

additionalSessionBtn.addEventListener('click', () => {
    const totalClasses = parseInt(document.getElementById('totalClasses').value);
    const attendedClasses = parseInt(document.getElementById('attendedClasses').value);
    const additionalClasses = prompt("Enter the number of additional sessions you plan to attend:");

    if (additionalClasses === null) return;
    const additional = parseInt(additionalClasses);
    if (isNaN(additional) || additional < 0) {
        alert('Please enter a valid number of additional sessions.');
        return;
    }

    const newTotalClasses = totalClasses + additional;
    const newAttendedClasses = attendedClasses + additional;
    const newPercentage = calculatePercentage(newAttendedClasses, newTotalClasses);

    updatedPercentageDisplay.textContent = `${newPercentage.toFixed(2)}%`;
    updateProgressBar(newPercentage, updatedProgressBar);

    let message;
    if (newPercentage >= REQUIRED_PERCENTAGE) {
        message = `Congratulations! You have reached the required attendance of ${REQUIRED_PERCENTAGE}%.`;
    } else {
        const stillNeeded = calculateAdditionalClasses(newTotalClasses, newAttendedClasses, REQUIRED_PERCENTAGE);
        message = `You still need to attend ${stillNeeded} more class(es) to meet the ${REQUIRED_PERCENTAGE}% attendance requirement.`;
    }

    finalMessage.innerHTML = `After attending ${additional} additional session(s), your new attendance percentage will be ${newPercentage.toFixed(2)}%.<br>${message}`;
    finalMessage.style.color = newPercentage >= REQUIRED_PERCENTAGE ? 'var(--secondary)' : 'var(--error)';

    finalResult.style.display = 'block';
    finalResult.scrollIntoView({ behavior: 'smooth' });
});