const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config');
const bcrypt = require('bcryptjs'); // Importar bcryptjs
const secretKey = process.env.SECRET_KEY || 'messidios';
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());


const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken || req.headers['authorization']?.split(' ')[1];
    console.log('Token recibido:', token);  // Añadir log
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido' });
    }
};


router.post('/', async (req, res) => {
    try {
      const { email, contraseña } = req.body;
      // Verificar si el usuario existe en la base de datos
      const sql = 'SELECT * FROM users WHERE mail = ?';
      db.query(sql, [email], async (err, result) => {
        if (err) {
          console.error("Error en la consulta:", err);
          return res.status(500).json({ message: "Error en el servidor" });
        }
  
        if (result.length === 0) {
          return res.status(401).json({ message: "Credenciales inválidas" });
        }
  
        const user = result[0];
        // Comparar la contraseña ingresada con la contraseña almacenada (hasheada)
        const match = await bcrypt.compare(contraseña, user.userPassword);
        if (!match) {
          return res.status(401).json({ message: "Credenciales inválidas" });
        }
        // Crear un token JWT
        const token = jwt.sign({ userId: user.userId, username: user.username, email: user.mail }, 'messidios', {
          expiresIn: '1h' // El token expira en 1 hora
        });
  
        // Enviar el token como cookie (o como prefieras)
        res.cookie('authToken', token, { httpOnly: true }); // 'httpOnly: true' para mayor seguridad
  
        // Devolver información del usuario al frontend
        res.json({
          message: 'Inicio de sesión exitoso',
          user: {
            userId: user.userId,
            username: user.username,
            email: user.mail // Asegúrate de que 'mail' coincida con el nombre de la columna en tu base de datos
          }
        });
      });
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  });


router.get('/usuario', verifyToken, (req, res) => {
    console.log('Solicitud recibida en /usuario');
  console.log('Usuario autenticado:', req.user);
  const userId = req.user.userId; 
  const query = 'SELECT * FROM users WHERE userId = ?';
  db.query(query, [userId], (err, results) => {
      if (err) {
          console.error('Error al obtener la información del usuario:', err);
          return res.status(500).json({ error: 'Error al obtener la información del usuario.' });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'Usuario no encontrado.' });
      }

      const user = results[0];
      res.json({ 
          user: { 
              userId: user.userId,
              username: user.username,
              email: user.mail,
              // ... otras propiedades del usuario que quieras enviar
          } 
      });
  });
});
module.exports = router;