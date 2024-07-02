document.addEventListener('DOMContentLoaded', () => {
    // Variables para el campo de la contraseña y el botón de mostrar contraseña
    var passwordInput = document.getElementById("contraseña");
    var mostrarContra = document.getElementById("mostrarContra");

    // Evento para el botón de mostrar contraseña
    mostrarContra.addEventListener("click", (event) => {
        event.preventDefault(); // Evitar que el botón intente enviar el formulario
        mostrarContraseña(passwordInput, mostrarContra);
    });

    // Función para alternar la visibilidad de la contraseña
    function mostrarContraseña(passwordInput, mostrarContra) {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            mostrarContra.textContent = "Ocultar";
        } else {
            passwordInput.type = "password";
            mostrarContra.textContent = "Mostrar";
        }
    }

    // Evento para el botón de enviar datos del formulario de ingreso
    document.getElementById('ingresar').addEventListener("click", enviarDatos);

    // Función para enviar los datos
    function enviarDatos() {
        const emailUsuario = document.getElementById('email').value;
        const contraseñaUsuario = document.getElementById('contraseña').value;

        // Construir un objeto con los datos que se desean enviar
        var datos = {
            email: emailUsuario,
            contraseña: contraseñaUsuario
        };

        var formulario = document.getElementById("formulario");  // Obtener el formulario
        var inputs = formulario.getElementsByTagName("input");  // Obtener todos los campos de entrada dentro del formulario

        // Validar los datos ingresados
        if (datosVacios(inputs) && validarDatos(inputs) && validarContraseña(contraseñaUsuario)) {
            console.log('Todos los datos son correctos. Enviando datos...')

            // Realizar una solicitud POST a la API utilizando fetch
            fetch('http://localhost:5500/login', {
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
                    console.log('Respuesta de la API:', data); // Hacer algo con la respuesta de la API, si es necesario

                    // Redirigir a la página principal en caso de que la respuesta sea exitosa
                    window.location.href = 'http://localhost:3000/'; // Ajusta la URL según sea necesario;
                })
                .catch(error => {
                    console.error('Error al enviar datos a la API:', error);
                    alert("Los datos ingresados son incorrectos")
                });
        }
    }

    // Función para verificar si hay campos vacíos
    function datosVacios(inputs) {
        // Iterar sobre los campos y verificar si están vacíos
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value.trim() === "") {
                console.error("Hay campos vacios");
                alert("Por favor, llene todos los campos.");
                return false;
            }
        }
        return true;
    }

    // Función para validar los datos
    function validarDatos(inputs) {
        var regex = /[,*()]/g; // Expresión regular para caracteres no permitidos

        // Comprobar si el texto contiene algún carácter no permitido
        for (var i = 0; i < inputs.length; i++) {
            var inputValue = inputs[i].value.trim(); // Obtener y limpiar el valor del campo

            if (regex.test(inputValue)) { // Probar el valor del campo contra la expresión regular
                console.error("El texto no puede contener los siguientes caracteres: '[', ']', '*', '(', ')'");
                alert("El texto no puede contener los siguientes caracteres: '[', ']', '*', '(', ')'");
                return false;
            }
        }

        // Si ningún campo contiene caracteres no permitidos, todos son válidos
        console.log("Todos los textos son válidos.");
        return true;
    }

    // Función para validar la contraseña
    function validarContraseña(contraseña) {
        var expresionRegular = /^[a-zA-Z0-9]{8,20}$/; // Expresión regular para validar que la contraseña contenga solo letras y números

        // Verificar si la contraseña cumple con los criterios
        if (expresionRegular.test(contraseña)) {
            console.log('La contraseña es válida.');
            return true;
        } else {
            console.error('La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.');
            alert('La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.');
            return false;
        }
    }
});