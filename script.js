function setDefaultDateTime() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const startDate = `${year}-${month}-${day}T07:00`;
    const endDate = `${year}-${month}-${day}T16:00`;

    document.getElementById('startDate').value = startDate;
    document.getElementById('endDate').value = endDate;
}

function calculatePay(hours, minutes) {
    const BASE_HOUR = 8.0;
    const OVERTIME_RATE_1 = 1.5;
    const OVERTIME_RATE_2 = 2.0;

    let totalHours = hours + minutes / 60.0;
    let regularHours = Math.min(totalHours, BASE_HOUR);
    let overtimeHours = Math.max(totalHours - BASE_HOUR, 0);
    let effectiveHours = regularHours;

    if (overtimeHours > 4) {
        effectiveHours += 4 * OVERTIME_RATE_1 + (overtimeHours - 4) * OVERTIME_RATE_2;
    } else {
        effectiveHours += overtimeHours * OVERTIME_RATE_1;
    }

    return effectiveHours;
}

function calculateFinalAmount(startDate, endDate, lunchBreak, dinnerBreak) {
    const millisecondsPerHour = 1000 * 60 * 60;
    const totalWorkMilliseconds = endDate - startDate;
    const totalWorkHours = totalWorkMilliseconds / millisecondsPerHour;

    const breakHours = (lunchBreak + dinnerBreak) / 60;
    const effectiveHours = totalWorkHours - breakHours;
    const effectiveMinutes = (effectiveHours % 1) * 60;

    const adjustedHours = calculatePay(Math.floor(effectiveHours), Math.floor(effectiveMinutes));
    const totalUnits = adjustedHours / 8.0;

    return {
        totalWorkHours: totalWorkHours.toFixed(2),
        effectiveHours: adjustedHours.toFixed(2),
        totalUnits: totalUnits.toFixed(2)
    };
}

function calculateSalary() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const lunchBreak = parseInt(document.getElementById('lunchBreak').value, 10);
    const dinnerBreak = parseInt(document.getElementById('dinnerBreak').value, 10);

    const result = calculateFinalAmount(startDate, endDate, lunchBreak, dinnerBreak);

    document.getElementById('result').innerHTML = `총 근무 시간: ${result.totalWorkHours}시간<br>휴식 및 초과근무 반영 시간: ${result.effectiveHours}시간<br>총 품수: ${result.totalUnits}품`;
}

function navigateTo(page) {
    window.location.href = page;
}

window.onload = setDefaultDateTime;
