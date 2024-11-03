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
<<<<<<< Updated upstream:index.js
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'], // Permitir ambos orígenes
=======
  origin: ['http://localhost:3000'], 
>>>>>>> Stashed changes:juan/index.js
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

// Función para verificar la autenticación del usuario
const authenticateToken = (req, res, next) => {
  const authToken = req.cookies.authToken;
  console.log("authToken recibido:", authToken); // Log para ver el valor de la cookie
  if (!authToken) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  try {
    const { token, userId } = JSON.parse(authToken);
    const decoded = jwt.verify(token, 'SECRET_KEY'); // Asegúrate de que la clave secreta sea correcta

    if (decoded.userId !== userId) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.userId = userId; 
    next(); 
  } catch (err) {
    console.error('Error al verificar el token JWT:', err);
    return res.status(403).json({ error: 'Token inválido' });
  }
};

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