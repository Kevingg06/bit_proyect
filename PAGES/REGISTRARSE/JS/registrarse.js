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



    const input = document.getElementById('contraseña1_empleado');
    const placeholderChar = '*'; // Caracter específico

    input.addEventListener('input', function () {
        let value = input.value;
        let replacedValue = value.replace(/./g, placeholderChar);
        input.value = replacedValue;
    });

    const input2 = document.getElementById('contraseña2_empleado');
    const placeholderChar2 = '*'; // Caracter específico

    input2.addEventListener('input', function () {
        let value = input2.value;
        let replacedValue = value.replace(/./g, placeholderChar2);
        input2.value = replacedValue;
    });

    const input3 = document.getElementById('contraseña1_empresa');
    const placeholderChar3 = '*'; // Caracter específico

    input3.addEventListener('input', function () {
        let value = input3.value;
        let replacedValue = value.replace(/./g, placeholderChar3);
        input3.value = replacedValue;
    });

    const input4 = document.getElementById('contraseña2_empresa');
    const placeholderChar4 = '*'; // Caracter específico

    input4.addEventListener('input', function () {
        let value = input4.value;
        let replacedValue = value.replace(/./g, placeholderChar4);
        input4.value = replacedValue;
    });



    function validarContraseña(contraseña) {
        // Expresión regular para validar que la contraseña contenga solo letras y números
        var expresionRegular = /^[a-zA-Z0-9]{8,20}$/;

        // Verificar si la contraseña cumple con los criterios
        if (expresionRegular.test(contraseña)) {
            var textaso = "La contraseña es válida.";
            return true;
        } else {
            var textaso = "La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.";
            return false;
        }
    }

    function segundaContraseña_empleado(contraseña){
        var contraseña2 = document.getElementById("contraseña2_empleado")

        if (contraseña == contraseña2){
            return true;
        } else {
            var textaso = "Las contraseñas deben ser iguales";
            return false;
        }
    }



    function enviarDatos_empleado() {
        // Obtener los valores de los elementos input
        var nombre = document.getElementById("nombre_empleado").value;
        var email = document.getElementById("email_empleado").value;
        var edad = document.getElementById("edad_empleado").value;
        var contraseña = document.getElementById("contraseña1_empleado").value;

        // Construir un objeto con los datos que deseas enviar
        var datos = {
            nombre: nombre,
            email: email,
            edad: edad,
            contraseña: contraseña
        };

        if (validarContraseña(contraseña) && segundaContraseña_empleado(contraseña)){

            // Realizar una solicitud POST a la API utilizando fetch
            fetch('https://ejemplo.com/api/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('La solicitud no fue exitosa');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Respuesta de la API:', data);
                    // Hacer algo con la respuesta de la API, si es necesario
                })
                .catch(error => {
                    console.error('Error al enviar datos a la API:', error);
                });
        }// if 1
    }// enviarDatos_empleado()



    function generarTextoHTML(textaso) {
        // Crear un elemento <p>
        var parrafo = document.createElement("p");
        
        // Agregar texto al párrafo
        parrafo.textContent = textaso;
        
        // Insertar el párrafo en el contenedor
        var contenedor = document.getElementById("mesageError");
        contenedor.appendChild(parrafo);
    }
});