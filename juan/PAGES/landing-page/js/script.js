document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los elementos del DOM
    let toggle = document.getElementById('switch'); // Botón de cambio de tema
    let header = document.getElementById('header'); // Encabezado
    let background = document.getElementById('background'); // Fondo
    let h1 = document.getElementById('h1'); // Título principal
    let p = document.querySelector('p'); // Primer párrafo
    let span = document.querySelector('span'); // Elemento span dentro del primer párrafo
    let footer = document.querySelector('footer'); // Pie de página
    let button = document.getElementsByClassName('button'); // Todos los botones
    let signIn = button.item(0); // Botón "Crear Cuenta"
    let logIn = button.item(1); // Botón "Iniciar Sesión"

    // Función para cambiar entre temas claro y oscuro
    toggle.onclick = function dark() {
        // Alternar clases de activo para los elementos principales
        header.classList.toggle('active');
        background.classList.toggle('active');
        h1.classList.toggle('active');
        p.classList.toggle('active');
        span.classList.toggle('active');
        footer.classList.toggle('active');
        signIn.classList.toggle('active');
        logIn.classList.toggle('active');
        toggle.classList.toggle('active');

        // Cambiar el texto del botón de acuerdo al tema activo
        if (toggle.classList.contains('active')) {
            toggle.innerText = 'Oscuro';
        } else {
            toggle.innerText = 'Claro';
        }
    }
});