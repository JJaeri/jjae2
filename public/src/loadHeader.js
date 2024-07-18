// public/src/loadHeader.js
document.addEventListener("DOMContentLoaded", function() {
    fetch("../common/header.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
        })
        .catch(error => console.error('Error loading header:', error));
});

