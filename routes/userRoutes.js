const express = require('express');
const router = express.Router();
const db = require('../config');
const jwt = require('jsonwebtoken');

// Ruta para obtener el perfil del usuario
router.get('/profile', (req, res) => {
    const authToken = req.cookies.authToken;
  
    if (!authToken) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    try {
      const { token, userId } = JSON.parse(authToken);
      const decoded = jwt.verify(token, 'SECRET_KEY');

      if (decoded.userId !== userId) {
        return res.status(403).json({ error: 'Token inválido' });
      }

      db.query('SELECT * FROM users WHERE userId = ?', [userId], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (result.length === 0) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const usuario = result[0];
        res.json({ username: usuario.username }); 
      });
    } catch (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
});

// Ruta para actualizar la descripción 
router.put('/description', (req, res) => {
  const userId = req.body.userId;
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

// Ruta para actualizar los títulos
router.put('/titles', (req, res) => {
  const userId = req.body.userId; 
  const newTitles = req.body.titles;

  const sql = 'UPDATE users SET titles = ? WHERE userId = ?';
  db.query(sql, [newTitles, userId], (err, result) => {
    if (err) {
      console.error('Error al actualizar los títulos:', err);
      res.status(500).json({ error: 'Error al actualizar los títulos' });
    } else {
      console.log('Títulos actualizados correctamente');
      res.status(200).json({ message: 'Títulos actualizados' });
    }
  });
});

module.exports = router;