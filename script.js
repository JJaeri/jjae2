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

function calculateSalary() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const lunchBreak = parseInt(document.getElementById('lunchBreak').value, 10);
    const dinnerBreak = parseInt(document.getElementById('dinnerBreak').value, 10);

    const millisecondsPerHour = 1000 * 60 * 60;
    const hoursWorked = (endDate - startDate) / millisecondsPerHour;
    const effectiveHours = hoursWorked - (lunchBreak / 60) - (dinnerBreak / 60);

    let totalPay = 0;
    let totalUnits = 0;
    const basePayPerHour = 17500; // 시간당 급여 (140,000원 / 8시간)

    if (effectiveHours <= 8) {
        totalUnits = effectiveHours / 8;
        totalPay = totalUnits * 140000; // 1품 = 140,000원
    } else {
        totalUnits = 1 + (effectiveHours - 8) / 12; // 8시간 초과 근무 계산
        totalPay = 140000 + (effectiveHours - 8) * basePayPerHour * 1.5; // 초과 근무 시 1.5배 지급
    }

    document.getElementById('result').innerHTML = `총 급여: ${totalPay.toLocaleString()}원<br>총 품: ${totalUnits.toFixed(2)}품`;
}

function navigateTo(page) {
    window.location.href = page;
}

window.onload = setDefaultDateTime;
