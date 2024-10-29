const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5500;
const { v4: uuidv4 } = require('uuid');
const db = require('./config'); 
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
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

// Rutas
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/user', userRoutes); // Asegúrate de que esta línea esté aquí

// Ruta para actualizar la descripción
app.put('/api/user/description', authenticateToken, (req, res) => {
  const userId = req.userId;
  const newDescription = req.body.description;

  const sql = 'UPDATE users SET description = ? WHERE userId = ?';
  db.query(sql, [newDescription, userId], (err, result) => {
    if (err) {
      console.error('Error al actualizar la descripción:', err);
      res.status(500).json({ error: 'Error al actualizar la descripción' });
    } else {
      console.log('Descripción actualizada correctamente');
      res.status(200).json({ message: 'Descripción actualizada' });
    }
  });
});

// Asegúrate de que no se dupliquen las rutas aquí
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});