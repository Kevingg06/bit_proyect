document.addEventListener('DOMContentLoaded', () => {
    const elecciones = document.querySelectorAll('.btn_eleccion');
    const roots = document.querySelectorAll('.root');
    const opcion = document.querySelector('#root_eleccion');
    const vueltas = document.querySelectorAll('.volver');
    const btnEmpleado = document.querySelector('#btn_empleado');
    const btnEmpresa = document.querySelector('#btn_empresa');

    // Función para desactivar todos los elementos
    function desactivarTodos() {
        elecciones.forEach(eleccion => eleccion.classList.remove('active'));
        roots.forEach(content => content.classList.remove('active'));
        opcion.classList.remove('active');
        btnEmpleado.classList.remove('active');
        btnEmpresa.classList.remove('active');
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


    const contraseña1_empresa = document.getElementById('contraseña1_empresa').value;
    const contraseña2_empresa = document.getElementById('contraseña2_empresa').value;





    // Event listener para el botón de enviar datos del empleado
    document.getElementById('datos_empleado').addEventListener("click", enviarDatos_empleado);

    function enviarDatos_empleado() {
        const nombre_empleado = document.getElementById('nombre_empleado').value;
        const email_empleado = document.getElementById('email_empleado').value;
        const edad_empleado = document.getElementById('edad_empleado').value;
        const contraseña1_empleado = document.getElementById('contraseña1_empleado').value;



        // Obtener los valores reales de las contraseñas
        var contraseña1 = contraseña1_empleado;

        // Construir un objeto con los datos que deseas enviar
        var datos = {
            // Otros campos de datos aquí...
            contraseña1: contraseña1
        };

        // Validar las contraseñas
        if (validarContraseña(contraseña1) && segundaContraseña(contraseña1)) {
            console.log('Todos los datos son correctos. Enviando datos...')

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

    function validarContraseña(contraseña) {
        // Expresión regular para validar que la contraseña contenga solo letras y números
        var expresionRegular = /^[a-zA-Z0-9]{8,20}$/;

        // Verificar si la contraseña cumple con los criterios
        if (expresionRegular.test(contraseña)) {
            console.log('La contraseña es válida.');
            eliminarTextoHTML();
            return true;
        } else {
            var textaso = 'La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.'
            generarTextoHTML(textaso);
            console.log('La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.');
            return false;
        }
    }

    function segundaContraseña(contraseña, contraseña2) {
        const contraseña2_empleado = document.getElementById('contraseña2_empleado').value;
        if (contraseña === contraseña2_empleado) {
            console.log('Las dos contraseñas son iguales')
            eliminarTextoHTML();
            return true;
        } else {
            console.log("Las contraseñas deben ser iguales")
            var textaso = "Las contraseñas deben ser iguales";
            generarTextoHTML(textaso);
            return false;
        }
    }

    function generarTextoHTML(textaso) {
        // Crear un nuevo elemento <p>
        var parrafo = document.createElement("p");

        // Agregar texto al nuevo párrafo
        parrafo.textContent = textaso;

        // Obtener los elementos con la clase 'mesageError'
        var contenedores = document.getElementsByClassName("mesageError");

        // Verificar que haya al menos un elemento con esa clase
        for (var i = 0; i < contenedores.length; i++) {
            var contenedor = contenedores[i];

            // Eliminar el elemento <p> anterior si existe
            var parrafosAnteriores = contenedor.getElementsByTagName("p");
            if (parrafosAnteriores.length > 0) {
                contenedor.removeChild(parrafosAnteriores[0]);
            }

            // Agregar el nuevo párrafo al contenedor actual
            contenedor.appendChild(parrafo.cloneNode(true));
            contenedor.classList.add('active');
        }
    }


    function eliminarTextoHTML() {
        console.log('patata')
        var contenedores = document.getElementsByClassName("mesageError");
    
        // Iterar sobre todos los contenedores
        for (var i = 0; i < contenedores.length; i++) {
            var contenedor = contenedores[i];
            var parrafos = contenedor.getElementsByTagName("p");
    
            // Eliminar todos los elementos <p> en el contenedor
            while (parrafos.length > 0) {
                contenedor.removeChild(parrafos[0]);
            }
        }
    }    
});
