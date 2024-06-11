document.addEventListener('DOMContentLoaded', () => {
    const elecciones = document.querySelectorAll('.btn_eleccion');
    const roots = document.querySelectorAll('.root');
    const opcion = document.querySelector('#root_eleccion'); // Selecciona el único elemento con id root_eleccion
    const vueltas = document.querySelectorAll('.volver');

    // Inicialmente agregar la clase active a #root_eleccion
    opcion.classList.add('active');

    elecciones.forEach((eleccion, index) => {
        eleccion.addEventListener('click', (e) => {
            // Remover la clase active de todos los botones
            elecciones.forEach(eleccion => { eleccion.classList.remove('active') });
            // Añadir la clase active al botón clicado
            eleccion.classList.add('active');

            // Remover la clase active de todos los elementos con clase .root
            roots.forEach(content => { content.classList.remove('active') });
            // Añadir la clase active al elemento root correspondiente al botón clicado
            if (index < roots.length) {
                roots[index].classList.add('active');
            }

            // Remover la clase active del elemento #root_eleccion cuando se hace clic en un botón .btn_eleccion
            opcion.classList.remove('active');
        });
    });

    vueltas.forEach((volver) => {
        volver.addEventListener('click', (e) => {
            // Remover la clase active de todos los elementos .volver excepto el clicado
            vueltas.forEach(v => {
                if (v !== volver) {
                    v.classList.remove('active');
                }
            });

            // Alternar la clase active en el elemento .volver clicado
            volver.classList.toggle('active');

            // Remover la clase active del elemento #root_eleccion si cualquier .volver tiene la clase active
            if ([...vueltas].some(v => v.classList.contains('active'))) {
                opcion.classList.remove('active');
            } else {
                opcion.classList.add('active');
            };

            roots.classList.remove('active');
            elecciones.classList.remove('active');
        });
    });
});
