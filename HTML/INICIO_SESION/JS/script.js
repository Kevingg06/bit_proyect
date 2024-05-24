document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById('myInput');
    const placeholderChar = '*'; // Caracter específico

    input.addEventListener('input', function() {
        let value = input.value;
        let replacedValue = value.replace(/./g, placeholderChar);
        input.value = replacedValue;
    });
});

