document.addEventListener('DOMContentLoaded', () => {
    const elecciones = document.querySelectorAll('.btn_eleccion');
    const roots = document.querySelectorAll('.root');
    const opcion = document.querySelector('#root_eleccion');
    const vueltas = document.querySelectorAll('.volver');
    const btnEmpleado = document.querySelector('#btn_empleado');

    // Función para desactivar todos los elementos
    function desactivarTodos() {
        elecciones.forEach(eleccion => eleccion.classList.remove('active'));
        roots.forEach(content => content.classList.remove('active'));
        opcion.classList.remove('active');
        btnEmpleado.classList.remove('active');
    }

    // Inicialmente agregar la clase active a #root_eleccion
    opcion.classList.add('active');

    elecciones.forEach((eleccion, index) => {
        eleccion.addEventListener('click', (e) => {
            desactivarTodos();
            eleccion.classList.add('active');
            if (index < roots.length) {
                roots[index].classList.add('active');
            }
            opcion.classList.remove('active');
        });
    });

    vueltas.forEach((volver) => {
        volver.addEventListener('click', (e) => {
            desactivarTodos();
            opcion.classList.add('active');
        });
    });


    
    const input = document.getElementById('contraseña1');
    const placeholderChar = '*'; // Caracter específico

    input.addEventListener('input', function () {
        let value = input.value;
        let replacedValue = value.replace(/./g, placeholderChar);
        input.value = replacedValue;
    });

    const input2 = document.getElementById('contraseña2');
    const placeholderChar2 = '*'; // Caracter específico

    input2.addEventListener('input', function () {
        let value = input2.value;
        let replacedValue = value.replace(/./g, placeholderChar2);
        input2.value = replacedValue;
    });
});