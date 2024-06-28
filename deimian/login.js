document.addEventListener('DOMContentLoaded', () => {
    var passwordInput = document.getElementById("contraseña");
    var mostrarContra = document.getElementById("mostrarContra");

    mostrarContra.addEventListener("click", (event) => {
        event.preventDefault(); // Evitar que el botón intente enviar el formulario
        mostrarContraseña(passwordInput, mostrarContra);
    });

    function mostrarContraseña(passwordInput, mostrarContra) {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            mostrarContra.textContent = "Ocultar";
        } else {
            passwordInput.type = "password";
            mostrarContra.textContent = "Mostrar";
        }// else
    }// mostrarContraseña()





    document.getElementById('ingresar').addEventListener("click", enviarDatos);  // Event listener para el botón de enviar datos del empleado

    function enviarDatos() {
        const emailUsuario = document.getElementById('email').value;
        const contraseñaUsuario = document.getElementById('contraseña').value;


        var email = emailUsuario;
        var contraseña = contraseñaUsuario;

        // Construir un objeto con los datos que deseas enviar
        var datos = {
            email: email,
            contraseña: contraseña
        };

        var formulario = document.getElementById("formulario");  // Obtener el formulario
        var inputs = formulario.getElementsByTagName("input");  // Obtener todos los campos de entrada dentro del formulario

        // Validar las contraseñas
        if (datosVacios(inputs) && validarDatos(inputs) && validarContraseña(contraseña)) {
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
                    console.log('Respuesta de la API:', data);
                    // Hacer algo con la respuesta de la API, si es necesario
                })
                .catch(error => {
                    console.error('Error al enviar datos a la API:', error);
                });
        }// if
    }// enviarDatos_empleado()



    function datosVacios(inputs) {
        // Iterar sobre los campos y verificar si están vacíos
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value.trim() === "") {
                console.error("Hay campos vacios");
                alert("Por favor, llene todos los campos.");
                return false;
            }// if
        }// for
        return true;
    }// datosVacios()

    function validarDatos(inputs) {
        var regex = /[,*()]/g; // Definir una expresión regular que coincida con los caracteres no permitidos
    
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
    }// validarDatos()

    function validarContraseña(contraseña) {
        var expresionRegular = /^[a-zA-Z0-9]{8,20}$/;   // Expresión regular para validar que la contraseña contenga solo letras y números

        // Verificar si la contraseña cumple con los criterios
        if (expresionRegular.test(contraseña)) {
            console.log('La contraseña es válida.');
            return true;
        } else {
            var textaso = 'La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.'
            alert('La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.')
            return false;
        }
    }// validarContraseña()
});