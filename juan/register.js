
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
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





    document.getElementById('datos_empresa').addEventListener("click", enviarDatos_empresa);  // Event listener para el botón de enviar datos de la empresa

    function enviarDatos_empresa() {
        const nombre_empresa = document.getElementById('nombre_empresa').value;
        const email_empresa = document.getElementById('email_empresa').value;
        const direccion_empresa = document.getElementById('direccion_empresa').value;
        const contraseña1_empresa = document.getElementById('contraseña1_empresa').value;
        const contraseña2_empresa = document.getElementById('contraseña2_empresa').value;


        var nombre = nombre_empresa;
        var email = email_empresa;
        var direccion = direccion_empresa;
        var contraseña1 = contraseña1_empresa;
        var contraseña2 = contraseña2_empresa;

        // Construir un objeto con los datos que deseas enviar
        var datosEmpresa = {
            nombre: nombre,
            email: email,
            direccion: direccion,
            contraseña1: contraseña1,
            contraseña2: contraseña2
        };

        var formulario = document.getElementById("form_empresa");  // Obtener el formulario de empresa
        var inputs = formulario.getElementsByTagName("input");  // Obtener todos los campos de entrada dentro del formulario

        // Validar los datos ingresados
        if (datosVacios(inputs) && validarDatos(nombre) && validarContraseña(contraseña1) && segundaContraseña(contraseña1, contraseña2)) {
            console.log('Todos los datos son correctos. Enviando datos...')
            
        
            // Realizar una solicitud POST a la API utilizando fetch
            fetch('http://localhost:5500/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',        //le indica al navegador que incluya las cookies y otros datos de autenticación con la solicitud
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
                    
                        console.log('Respuesta de la API:', data); // Hacer algo con la respuesta de la API, si es necesario
                        console.log('La solicitud POST se realizó correctamente'); 
    
                })
                .catch(error => {
                    console.error('Error al enviar datos a la API:', error);
                });
            } else {
                console.log('Validación de datos fallida');
            }
        // if
    }// enviarDatos_empresa()


    document.getElementById('datos_empleado').addEventListener("click", enviarDatos_empleado);  // Event listener para el botón de enviar datos del empleado
    console.log('Apunto de  enviarDatos_empleado ');
    function enviarDatos_empleado() {
        console.log('Función enviarDatos_empleado iniciada');
        const nombre_empleado = document.getElementById('nombre_empleado').value;
        const email_empleado = document.getElementById('email_empleado').value;
        const edad_empleado = document.getElementById('edad_empleado').value;
        const contraseña1_empleado = document.getElementById('contraseña1_empleado').value;
        const contraseña2_empleado = document.getElementById('contraseña2_empleado').value;


        var nombre = nombre_empleado;
        var email = email_empleado;
        var edad = edad_empleado
        var contraseña1 = contraseña1_empleado;
        var contraseña2 = contraseña2_empleado;

        // Construir un objeto con los datos que deseas enviar
        const datosEmpleado = {
            nombre: nombre,
            email: email,
            edad: edad,
            contraseña1: contraseña1,
            contraseña2: contraseña2
        };
        console.log('nombre= ', nombre, 'email=', email, 'edad= ', edad, 'contraseña1= ', contraseña1, 'contraseña2=', contraseña2)

        var formulario = document.getElementById("form_empleado");   // Obtener el formulario
        var inputs = formulario.getElementsByTagName("input");  // Obtener todos los campos de entrada dentro del formulario
        console.log(' formulario leído')

        // Validar las contraseñas
        if (datosVacios(inputs) && validarDatos(inputs) && validarContraseña(contraseña1) && segundaContraseña(contraseña1, contraseña2)) {
            console.log('Todos los datos son correctos. Enviando datos...')
            
            

            // Realizar una solicitud POST a la API utilizando fetch
            fetch('http://localhost:5500/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer <token>',
                    'Referer': 'http://localhost:5500/registrarse.html' 
                },
                mode: 'cors',
                credentials: 'include',  //le indica al navegador que incluya las cookies y otros datos de autenticación con la solicitud
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
                  
                        console.log('Respuesta de la API:', data); // Hacer algo con la respuesta de la API, si es necesario
                        console.log('La solicitud POST se realizó correctamente');
            
                })
                .catch(error => {
                    console.error('Error al enviar datos a la API:', error);
                });
            } else {
                console.log('Validación de datos fallida');
            }
        // if
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
        console.log('no hay datos vacios');
        return true;
    }// datosVacios()


    function validarContraseña(contraseña) {
        var expresionRegular = /^[a-zA-Z0-9]{8,20}$/;   // Expresión regular para validar que la contraseña contenga solo letras y números

        // Verificar si la contraseña cumple con los criterios
        if (expresionRegular.test(contraseña)) {
            console.log('La contraseña es válida.');
            
            return true;
        } else {

            alert('La contraseña no es válida. Debe contener solo letras y números, y tener entre 8 y 20 caracteres.')
            console.log('la contraseña no es valida');

            return false;

        }
    }// validarContraseña()


    function segundaContraseña(contraseña, contraseña2) {
        if (contraseña === contraseña2) {
            console.log('Las dos contraseñas son iguales')
            return true;
        } else {
            console.error("Las contraseñas deben ser iguales")
            alert("Las contraseñas deben ser iguales");
            return false;
        }
    }


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
});


