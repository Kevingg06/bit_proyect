const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5501; 
const { v4: uuidv4 } = require('uuid');
const db = require('./config');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');

app.use(express.json()); // Parsea el cuerpo de la solicitud como JSON
app.use(express.urlencoded({ extended: true })); // Permite decodificar los cuerpos de las solicitudes codificadas en URL

app.use(express.static('public')); // Sirve archivos estáticos desde el directorio 'public'

// Configuración CORS global para permitir acceso desde cualquier origen
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// Middleware de cookie-parser para manejar cookies
app.use(cookieParser());

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});

// Rutas para el registro y el inicio de sesión
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);

// Ruta de prueba para verificar el servidor
app.post('/', (req, res) => {
    console.log("Solicitud POST recibida en la raíz");
    res.send("Respuesta de prueba");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
