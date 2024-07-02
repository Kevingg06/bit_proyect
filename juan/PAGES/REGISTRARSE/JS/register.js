// Este evento se ejecuta cuando el DOM se ha cargado completamente.
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');

    // Selecciona todos los elementos con la clase '.btn_eleccion'.
    const elecciones = document.querySelectorAll('.btn_eleccion');
    // Selecciona todos los elementos con la clase '.root'.
    const roots = document.querySelectorAll('.root');
    // Selecciona el elemento con el ID '#root_eleccion'.
    const opcion = document.querySelector('#root_eleccion');
    // Selecciona todos los elementos con la clase '.volver'.
    const vueltas = document.querySelectorAll('.volver');
    // Selecciona el elemento con el ID '#btn_empleado'.
    const btnEmpleado = document.querySelector('#btn_empleado');
    // Selecciona el elemento con el ID '#btn_empresa'.
    const btnEmpresa = document.querySelector('#btn_empresa');

    // Función para desactivar todos los elementos.
    function desactivarTodos() {
        elecciones.forEach(eleccion => eleccion.classList.remove('active'));
        roots.forEach(content => content.classList.remove('active'));
        opcion.classList.remove('active');
        btnEmpleado.classList.remove('active');
        btnEmpresa.classList.remove('active');
    }

    // Inicialmente, agregar la clase 'active' a '#root_eleccion'.
    opcion.classList.add('active');

    // Agregar eventos de clic a cada uno de los botones de elección.
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

    // Agregar eventos de clic a cada botón de volver.
    vueltas.forEach((volver) => {
        volver.addEventListener('click', (e) => {
            desactivarTodos();
            opcion.classList.add('active');
        });
    });



    // Agregar evento de clic para el botón de enviar datos de la empresa.
    document.getElementById('datos_empresa').addEventListener("click", enviarDatos_empresa);

    // Función para enviar los datos de la empresa.
    function enviarDatos_empresa() {
        const nombre_empresa = document.getElementById('nombre_empresa').value;
        const email_empresa = document.getElementById('email_empresa').value;
        const direccion_empresa = document.getElementById('direccion_empresa').value;
        const contraseña1_empresa = document.getElementById('contraseña1_empresa').value;
        const contraseña2_empresa = document.getElementById('contraseña2_empresa').value;

        // Construir un objeto con los datos que deseas enviar.
        const datosEmpresa = {
            nombre: nombre_empresa,
            email: email_empresa,
            direccion: direccion_empresa,
            contraseña1: contraseña1_empresa,
            contraseña2: contraseña2_empresa
        };

        var formulario = document.getElementById("form_empresa");  // Obtener el formulario de empresa.
        var inputs = formulario.getElementsByTagName("input");  // Obtener todos los campos de entrada dentro del formulario.

        // Validar los datos ingresados.
        if (datosVacios(inputs) && validarDatos(nombre_empresa) && validarContraseña(contraseña1_empresa) && segundaContraseña(contraseña1_empresa, contraseña2_empresa)) {
            console.log('Todos los datos son correctos. Enviando datos...');
            
            // Realizar una solicitud POST a la API utilizando fetch.
            fetch('http://localhost:5500/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',  // Incluir cookies y otros datos de autenticación con la solicitud.
                body: JSON.stringify(datosEmpresa)
            })
            .then(response => {
                console.log('Respuesta recibida:', response.status);
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta de la API:', data);  // Hacer algo con la respuesta de la API, si es necesario.
                console.log('La solicitud POST se realizó correctamente');
            })
            .catch(error => {
                console.error('Error al enviar datos a la API:', error);
            });
        } else {
            console.log('Validación de datos fallida');
        }
    }

    // Agregar evento de clic para el botón de enviar datos del empleado.
    document.getElementById('datos_empleado').addEventListener("click", enviarDatos_empleado);
    console.log('Apunto de enviarDatos_empleado ');

    // Función para enviar los datos del empleado.
    function enviarDatos_empleado() {
        console.log('Función enviarDatos_empleado iniciada');
        const nombre_empleado = document.getElementById('nombre_empleado').value;
        const email_empleado = document.getElementById('email_empleado').value;
        const edad_empleado = document.getElementById('edad_empleado').value;
        const contraseña1_empleado = document.getElementById('contraseña1_empleado').value;
        const contraseña2_empleado = document.getElementById('contraseña2_empleado').value;

        // Construir un objeto con los datos que deseas enviar.
        const datosEmpleado = {
            nombre: nombre_empleado,
            email: email_empleado,
            edad: edad_empleado,
            contraseña1: contraseña1_empleado,
            contraseña2: contraseña2_empleado
        };
        console.log('nombre= ', nombre_empleado, 'email=', email_empleado, 'edad= ', edad_empleado, 'contraseña1= ', contraseña1_empleado, 'contraseña2=', contraseña2_empleado);

        var formulario = document.getElementById("form_empleado");  // Obtener el formulario.
        var inputs = formulario.getElementsByTagName("input");  // Obtener todos los campos de entrada dentro del formulario.
        console.log(' formulario leído');

        // Validar las contraseñas.
        if (datosVacios(inputs) && validarDatos(inputs) && validarContraseña(contraseña1_empleado) && segundaContraseña(contraseña1_empleado, contraseña2_empleado)) {
            console.log('Todos los datos son correctos. Enviando datos...');
            
            // Realizar una solicitud POST a la API utilizando fetch.
            fetch('http://localhost:5500/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer <token>', 
                },
                mode: 'cors',
                credentials: 'include',  // Incluir cookies y otros datos de autenticación con la solicitud.
                body: JSON.stringify(datosEmpleado)
            })
            .then(response => {
                console.log('Respuesta recibida:', response.status);
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta de la API:', data);  // Hacer algo con la respuesta de la API, si es necesario.
                console.log('La solicitud POST se realizó correctamente');

                // Redirigir a otra página en caso de éxito.
                window.location.href = 'http://localhost:3000/';  // Ajusta la URL según sea necesario.
            })
            .catch(error => {
                console.error('Error al enviar datos a la API:', error);
            });
        } else {
            console.log('Validación de datos fallida');
        }
    }

    // Función para verificar si hay campos vacíos.
    function datosVacios(inputs) {
        // Iterar sobre los campos y verificar si están vacíos.
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value.trim() === "") {
                console.error("Hay campos vacíos");
                alert("Por favor, llene todos los campos.");
                return false;
            }
        }
        console.log('no hay datos vacíos');
        return true;
    }

    // Función para validar la contraseña.
    function validarContraseña(contraseña) {
        var expresionRegular = /^[a-zA-Z0-9]{8,20}$/;  // Expresión regular para validar que la contraseña contenga solo letras y números.

        // Verificar si la contraseña cumple con los criterios.
        if (expresionRegular.test(contraseña)) {
            console.log('La contraseña es válida.');
            return true;
        } else {
            alert('La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.');
            console.log('la contraseña no es válida');
            return false;
        }
    }

    // Función para verificar si las dos contraseñas son iguales.
    function segundaContraseña(contraseña, contraseña2) {
        if (contraseña === contraseña2) {
            console.log('Las dos contraseñas son iguales');
            return true;
        } else {
            console.error("Las contraseñas deben ser iguales");
            alert("Las contraseñas deben ser iguales");
            return false;
        }
    }

    // Función para validar los datos.
    function validarDatos(inputs) {
        var regex = /[,*()]/g;  // Definir una expresión regular que coincida con los caracteres no permitidos.

        // Comprobar si el texto contiene algún carácter no permitido.
        for (var i = 0; i < inputs.length; i++) {
            var inputValue = inputs[i].value.trim();  // Obtener y limpiar el valor del campo.
            if (regex.test(inputValue)) {  // Probar el valor del campo contra la expresión regular.
                console.error("El texto no puede contener los siguientes caracteres: '[', ']', '*', '(', ')'");
                alert("El texto no puede contener los siguientes caracteres: '[', ']', '*', '(', ')'");
                return false;
            }
        }
        // Si ningún campo contiene caracteres no permitidos, todos son válidos.
        console.log("Todos los textos son válidos.");
        return true;
    }
});
