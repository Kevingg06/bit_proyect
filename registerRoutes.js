const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 5500;
const bcrypt = require('bcryptjs');

// POST request handler for /register
router.post('/', async (req, res) => {
  const { nombre, email, direccion, contraseña1, edad, cuit } = req.body; // 🎯 Obtener cuit del body
  console.log('Solicitud POST recibida en /register con datos:', req.body);

  let role;
  let insertQuery;
  let queryParams;

  // 🎯 Corregir la condición para verificar si es una empresa
  if (cuit) { 
    // Registro de empresa
    role = 'empresa';
    insertQuery = 'INSERT INTO company (companyId, name, mail, cuit, companyPassword) VALUES (?, ?, ?, ?, ?)';
    queryParams = [uuidv4(), nombre, email, cuit, await bcrypt.hash(contraseña1, 10)];
  } else if (edad) {
    // Registro de empleado
    role = 'empleado';
    insertQuery = 'INSERT INTO users (userId, username, userPassword, role, createdAt, age, phoneNumber, mail, subscription, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    queryParams = [uuidv4(), nombre, await bcrypt.hash(contraseña1, 10), role, new Date(), edad, null, email, false, direccion];
  } else {
    return res.status(400).json({ error: 'Datos de registro incompletos.' });
  }

  db.query(insertQuery, queryParams, (err, result) => {
    if (err) {
      console.error('Error al registrar:', err);
      return res.status(500).json({ error: 'Error al registrar en la base de datos.' });
    }

    if (result && result.affectedRows > 0) {
      const newId = result.insertId;
      const token = jwt.sign({ email, role, userId: newId }, 'SECRET_KEY');

      res.cookie('authToken', JSON.stringify({ token, userId: newId, nombre: nombre }));
      res.status(201).json({ message: `Usuario registrado exitosamente.`, token, userId: newId });
    } else {
      res.status(500).json({ error: 'Error al registrar en la base de datos.' });
    }
  });
});

module.exports = router;