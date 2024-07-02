document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los botones de avance, botones de volver y contenedores .root
    const avance = document.querySelectorAll('.siguiente');
    const volver = document.querySelectorAll('.volver');
    const roots = document.querySelectorAll('.root');
    
    roots[0].classList.add('active'); // Activar el primer contenedor .root al cargar la página

    // Evento click para los botones de avance
    avance.forEach((sig_btn, index) => {
        sig_btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir el comportamiento por defecto del botón

            // Verificar que no sea el último paso (índice 2)
            if (index !== 2) {
                roots[index].classList.remove('active'); // Remover la clase active del contenedor .root actual

                const nextIndex = index + 1; // Calcular el índice del próximo contenedor .root

                // Añadir la clase active al próximo contenedor .root si existe
                if (nextIndex < roots.length) {
                    roots[nextIndex].classList.add('active');
                }
            }
        });
    });

    // Evento click para los botones de volver
    volver.forEach((volver_btn, index) => {
        volver_btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir el comportamiento por defecto del botón

            // Verificar que no sea el primer paso (índice 0)
            if (index !== 0) {
                roots[index].classList.remove('active'); // Remover la clase active del contenedor .root actual

                const prevIndex = index - 1;// Calcular el índice del contenedor .root anterior

                // Añadir la clase active al contenedor .root anterior si existe
                if (prevIndex >= 0) {
                    roots[prevIndex].classList.add('active');
                }
            } else {
                window.location.href = "../INICIO_SESION/inicio_sesion.html"; // Si está en el primer paso, redirigir a otra página
            }
        });
    });
});