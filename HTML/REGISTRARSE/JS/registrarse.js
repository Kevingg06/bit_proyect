document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById('contraseña');
    const placeholderChar = '*'; // Caracter específico

    input.addEventListener('input', function() {
        let value = input.value;
        let replacedValue = value.replace(/./g, placeholderChar);
        input.value = replacedValue;
    });
});


    //tabs
const elecciones = document.querySelectorAll('.btn_eleccion');
const roots = document.querySelectorAll('.root');
    //all_content

elecciones.forEach((eleccion, index) => {
    eleccion.addEventListener('click', (e) => {
        elecciones.forEach(eleccion => { eleccion.classList.remove('active') });
        eleccion.classList.add('active');

        roots.forEach(content => { content.classList.remove('active') })
        roots[index].classList.add('active');
    })
})