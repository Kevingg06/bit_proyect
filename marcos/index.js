const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5500;
const { v4: uuidv4 } = require('uuid');
const db = require('./config');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración de CORS
const whitelist = ['http://localhost:3000', 'http://127.0.0.1:5500']; // ¡Asegúrate de que estos puertos sean correctos!

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log("Origen no permitido por CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// Usar el middleware de CORS
app.use(cors(corsOptions)); 

// Middleware de cookie-parser
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
app.use('/', loginRoutes);
// Ruta de prueba para verificar el servidor
app.post('/', (req, res) => {
    console.log("Solicitud POST recibida en la raíz");
    res.send("Respuesta de prueba");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});