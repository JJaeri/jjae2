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
    const WAGE_PER_UNIT = 140000;

    let totalHours = hours + minutes / 60.0;
    let regularHours = Math.min(totalHours, BASE_HOUR);
    let overtimeHours = Math.max(totalHours - BASE_HOUR, 0);
    let overtimePay;

    if (overtimeHours > 4) {
        overtimePay = (4 * OVERTIME_RATE_1 + (overtimeHours - 4) * OVERTIME_RATE_2);
    } else {
        overtimePay = overtimeHours * OVERTIME_RATE_1;
    }

    let totalPay = regularHours + overtimePay;
    return totalPay;
}

function isValidWorkTime(workTime) {
    const timeParts = workTime.split(':');
    if (timeParts.length !== 2) return false;

    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    if (isNaN(hours) || isNaN(minutes)) return false;
    if (hours < 8 || hours > 24 || minutes < 0 || minutes > 59) return false;

    return true;
}

function calculateTax(amount) {
    const TAX_RATE = 0.154;
    return amount * TAX_RATE;
}

function calculateFinalAmount(hours, minutes) {
    if (!isValidWorkTime(`${hours}:${minutes}`)) {
        console.error("Invalid time format");
        return;
    }

    let totalUnits = calculatePay(hours, minutes);
    let totalWage = totalUnits * 140000;
    let tax = calculateTax(totalWage);
    let finalAmount = totalWage - tax;

    return {
        totalUnits: totalUnits,
        totalWage: totalWage,
        tax: tax,
        finalAmount: finalAmount
    };
}

function calculateSalary() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const lunchBreak = parseInt(document.getElementById('lunchBreak').value, 10);
    const dinnerBreak = parseInt(document.getElementById('dinnerBreak').value, 10);

    const millisecondsPerHour = 1000 * 60 * 60;
    const hoursWorked = (endDate - startDate) / millisecondsPerHour;
    const effectiveHours = hoursWorked - (lunchBreak / 60) - (dinnerBreak / 60);
    const effectiveMinutes = (effectiveHours % 1) * 60;

    const result = calculateFinalAmount(Math.floor(effectiveHours), Math.floor(effectiveMinutes));

    if (result) {
        document.getElementById('result').innerHTML = `총 급여: ${result.totalWage.toLocaleString()}원<br>총 품: ${result.totalUnits.toFixed(2)}품<br>세금: ${result.tax.toLocaleString()}원<br>최종 금액: ${result.finalAmount.toLocaleString()}원`;
    } else {
        document.getElementById('result').innerHTML = `잘못된 시간 형식입니다. 다시 확인해 주세요.`;
    }
}

function navigateTo(page) {
    window.location.href = page;
}

window.onload = setDefaultDateTime;
