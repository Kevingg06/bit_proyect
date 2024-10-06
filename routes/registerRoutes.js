const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 5500;
const bcrypt = require('bcryptjs');

// POST request handler for /register
router.post('/', async (req, res) => {
  const { nombre, email, direccion, contraseña1, edad } = req.body;
  console.log('Solicitud POST recibida en /register con datos:', req.body);

  let role;
  if (direccion) {
    role = 'empresa';
  } else if (edad) {
    role = 'empleado';
  } else {
    return res.status(400).json({ error: 'Datos de registro incompletos.' });
  }

  const hashedContraseña1 = await bcrypt.hash(contraseña1, 10);

  // Insertar usuario en la base de datos
  const insertQuery = 'INSERT INTO users (userId, username, userPassword, role, createdAt, age, phoneNumber, mail, subscription, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const queryParams = [uuidv4(), nombre, hashedContraseña1, role, new Date(), edad || null, null, email, false, direccion || null];

  db.query(insertQuery, queryParams, (err, result) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      return res.status(500).json({ error: 'Error al registrar usuario en la base de datos.' });
    }

    if (result && result.affectedRows > 0) {
      const userId = result.insertId;

      // Generar el token JWT
      const token = jwt.sign({ email, role, userId }, 'SECRET_KEY');

      // Configurar la cookie SIN httpOnly
      res.cookie('authToken', JSON.stringify({ token, userId, nombre })); // 🎯 Modificación: se quita httpOnly
      res.status(201).json({ message: 'Usuario registrado exitosamente.', token, userId });
    } else {
      res.status(500).json({ error: 'Error al registrar usuario en la base de datos.' });
    }
  });
});

module.exports = router;