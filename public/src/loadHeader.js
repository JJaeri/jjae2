// public/src/loadHeader.js
document.addEventListener("DOMContentLoaded", function() {
    fetch("/jjae2/public/common/header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
        })
        .catch(error => console.error('Error loading header:', error));
});
