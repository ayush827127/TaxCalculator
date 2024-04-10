document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('myModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const errorIcons = document.querySelectorAll('.error-icon');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrorIcons();
        if (validateForm()) {
            const grossIncome = parseFloat(document.getElementById('grossIncome').value);
            const extraIncome = parseFloat(document.getElementById('extraIncome').value);
            const ageGroup = document.getElementById('age').value;
            const deductions = parseFloat(document.getElementById('deductions').value);
            const overallIncome = grossIncome + extraIncome - deductions;
            let tax = 0;
            if (overallIncome > 8) {
                if (ageGroup === '<40') {
                    tax = 0.3 * (overallIncome - 8);
                } else if (ageGroup === '≥40 & <60') {
                    tax = 0.4 * (overallIncome - 8);
                } else if (ageGroup === '≥60') {
                    tax = 0.1 * (overallIncome - 8);
                }
            }
            showModal(overallIncome, tax);
        }
    });

    closeModal.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    function clearErrorIcons() {
        errorIcons.forEach(icon => {
            icon.style.display = 'none';
        });
    }

    function validateForm() {
        let isValid = true;
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                const errorIcon = input.nextElementSibling;
                errorIcon.style.display = 'inline-block';
            }
        });
        return isValid;
    }

    function showModal(overallIncome, tax) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <h4> Your Overall Income will be: ${overallIncome.toFixed(2)} Lakhs</h4>
            <p> after tax Deductions </p>
        `;
        modal.style.display = 'block';
    }
});
