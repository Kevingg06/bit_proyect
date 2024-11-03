document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab_btn'); // Selecciona todos los elementos de pestañas
    const all_content = document.querySelectorAll('.content'); // Selecciona todo el contenido asociado a las pestañas
    const menu_pregunta = document.querySelectorAll('.flecha_menu'); // Selecciona todas los botones del menú
    const respuestas = document.querySelectorAll('.respuesta'); // Selecciona todas las respuestas asociadas a las preguntas

    // Añade un evento a cada pestaña para manejar el clic
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
            
            tabs.forEach(tab => { tab.classList.remove('active') }); // Elimina la clase 'active' de todas las pestañas
            tab.classList.add('active'); // Añade la clase 'active' a la pestaña clicada
            all_content.forEach(content => { content.classList.remove('active') }); // Elimina la clase 'active' de todo el contenido
            all_content[index].classList.add('active'); // Añade la clase 'active' al contenido correspondiente a la pestaña clicada
        }); // tabs.forEach
    }); // tabs

    // Añade un evento a cada pregunta del menú para manejar el clic
    menu_pregunta.forEach((pregunta, index) => {
        pregunta.addEventListener('click', (e) => {
            // Verifica si la pregunta ya está activa
            if (pregunta.classList.contains('active')) {
                // Si está activa, desactiva todas las preguntas y respuestas
                menu_pregunta.forEach(p => p.classList.remove('active'));
                respuestas.forEach(r => r.classList.remove('active'));
            } else {
                // Si no está activa, desactiva todas las preguntas
                menu_pregunta.forEach(p => p.classList.remove('active'));
                pregunta.classList.add('active'); // Activa la pregunta clicada

                // Desactiva todas las respuestas
                respuestas.forEach(r => r.classList.remove('active'));
                respuestas[index].classList.add('active'); // Activa la respuesta correspondiente a la pregunta clicada
            }
        }); // menu_pregunta.forEach
    }); // menu_pregunta
}); // DOMContentLoaded
