document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab_btn');
    const all_content = document.querySelectorAll('.content');

    const menu_pregunta = document.querySelectorAll('.flecha_menu');
    const respuestas = document.querySelectorAll('.respuesta');


    tabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(tab => { tab.classList.remove('active') });
            tab.classList.add('active');

            all_content.forEach(content => { content.classList.remove('active') });
            all_content[index].classList.add('active');
        });// tabs.forEach
    });// tabs


    menu_pregunta.forEach((pregunta, index) => {
        pregunta.addEventListener('click', (e) => {
            if (pregunta.classList.contains('active')) {
                menu_pregunta.forEach(p => p.classList.remove('active'));
                respuestas.forEach(r => r.classList.remove('active'));
            } else {
                menu_pregunta.forEach(p => p.classList.remove('active'));
                pregunta.classList.add('active');

                respuestas.forEach(r => r.classList.remove('active'));
                respuestas[index].classList.add('active');
            }
        });// menu_pregunta.forEach
    });// menu_pregunta
});// DOMContentLoaded
