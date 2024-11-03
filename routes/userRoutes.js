<<<<<<< Updated upstream:routes/userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config');
const jwt = require('jsonwebtoken');

// Ruta para obtener el perfil del usuario
router.get('/profile', (req, res) => {
    console.log('Cookies recibidas:', req.cookies); // Imprimir todas las cookies recibidas
  
    const authToken = req.cookies.authToken;
  
    if (!authToken) {
      console.log('No se encontró la cookie authToken'); // 🎯
    return res.status(401).json({ error: 'No autorizado' });
    }

    try {
    const { token, userId } = JSON.parse(authToken);
    console.log('Token parseado:', token); 
    console.log('ID del usuario:', userId);

      const decoded = jwt.verify(token, 'SECRET_KEY'); // Asegúrate de que la clave secreta sea correcta

    if (decoded.userId !== userId) {
        console.log('ID del usuario en el token no coincide con el ID en la cookie'); // 🎯
        return res.status(403).json({ error: 'Token inválido' });
    }

      console.log('Consulta SQL:', 'SELECT * FROM users WHERE userId = ?', [userId]);
      db.query('SELECT * FROM users WHERE userId = ?', [userId], (err, result) => {
        if (err) {
        console.error('Error en la consulta:', err); 
        return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (result.length === 0) {
          console.log('No se encontró ningún usuario con el ID:', userId); // 🎯
        return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log('Resultado de la consulta:', result); 
        const usuario = result[0];
        res.json({ username: usuario.username }); 
    });
    } catch (err) {
    console.error('Error al verificar el token JWT:', err);
    return res.status(403).json({ error: 'Token inválido' });
    }
});

=======
const express = require('express');
const router = express.Router();
const db = require('../config');
const jwt = require('jsonwebtoken');

// Ruta para obtener el perfil del usuario
router.get('/profile', (req, res) => {
    console.log('Cookies recibidas:', req.cookies); // Imprimir todas las cookies recibidas
  
    const authToken = req.cookies.authToken;
  
    if (!authToken) {
      console.log('No se encontró la cookie authToken'); // 🎯
    return res.status(401).json({ error: 'No autorizado' });
    }

    try {
    const { token, userId } = JSON.parse(authToken);
    console.log('Token parseado:', token); 
    console.log('ID del usuario:', userId);

      const decoded = jwt.verify(token, 'SECRET_KEY'); // Asegúrate de que la clave secreta sea correcta

    if (decoded.userId !== userId) {
        console.log('ID del usuario en el token no coincide con el ID en la cookie'); // 🎯
        return res.status(403).json({ error: 'Token inválido' });
    }

      console.log('Consulta SQL:', 'SELECT * FROM users WHERE userId = ?', [userId]);
      db.query('SELECT * FROM users WHERE userId = ?', [userId], (err, result) => {
        if (err) {
        console.error('Error en la consulta:', err); 
        return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (result.length === 0) {
          console.log('No se encontró ningún usuario con el ID:', userId); // 🎯
        return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log('Resultado de la consulta:', result); 
        const usuario = result[0];
        res.json({ username: usuario.username }); 
    });
    } catch (err) {
    console.error('Error al verificar el token JWT:', err);
    return res.status(403).json({ error: 'Token inválido' });
    }

// Ruta para actualizar los títulos
router.put('/titles', authenticateToken, (req, res) => { // 🔑 Aquí se agrega authenticateToken el cuál no estaba.
  const userId = req.userId; // Ahora puedes usar req.userId
  const newTitles = req.body.titles;

  const sql = 'UPDATE users SET titles = ? WHERE userId = ?';
  db.query(sql, [newTitles, userId], (err, result) => {
    if (err) {
      console.error('Error al actualizar los títulos:', err);
      res.status(500).json({ error: 'Error al actualizar los títulos' });
    } else {
      if (result.affectedRows === 0) {
        console.log('No se encontró un usuario con el ID:', userId);
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      console.log('Títulos actualizados correctamente');
      res.status(200).json({ message: 'Títulos actualizados', titles: newTitles });
    }
  });
});
});  


>>>>>>> Stashed changes:juan/routes/userRoutes.js
module.exports = router;