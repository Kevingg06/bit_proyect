document.addEventListener('DOMContentLoaded', () => {
    const avance = document.querySelectorAll('.siguiente');
    const volver = document.querySelectorAll('.volver');
    const roots = document.querySelectorAll('.root');

    roots[0].classList.add('active');

    avance.forEach((sig_btn, index) => {
        sig_btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir el comportamiento por defecto del botón
            if (index !== 2) {
                // Remover la clase active del root actual
                roots[index].classList.remove('active');

                // Calcular el índice del próximo root
                const nextIndex = index + 1;

                // Añadir la clase active al próximo root si existe
                if (nextIndex < roots.length) {
                    roots[nextIndex].classList.add('active');
                }
            }
        });
    });

    volver.forEach((volver_btn, index) => {
        volver_btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir el comportamiento por defecto del botón
            // Verificar si no estamos en el primer elemento .root
            if (index !== 0) {
                // Remover la clase active del root actual
                roots[index].classList.remove('active');

                // Calcular el índice del root anterior
                const prevIndex = index - 1;

                // Añadir la clase active al root anterior si existe
                if (prevIndex >= 0) {
                    roots[prevIndex].classList.add('active');
                }
            }
            if(index == 0){
                window.location.href = "../INICIO_SESION/inicio_sesion.html";
            }
        });
    });
});