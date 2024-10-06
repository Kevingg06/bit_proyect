const express = require('express');
const cors = require('cors'); // Asegúrate de tener instalado el paquete 'cors': npm install cors
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5500;
const { v4: uuidv4 } = require('uuid');
const db = require('./config');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes'); // 🎯 Importar userRoutes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// 🎯 Configuración de CORS usando el middleware 'cors'
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Permitir ambos orígenes
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

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

app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/user', userRoutes); // 🎯 Definir la ruta para /user

// Mover esta ruta al final
app.post('/', (req, res) => {
  console.log("Solicitud POST recibida en la raíz");
  res.send("Respuesta de prueba");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});