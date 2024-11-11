const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (cb) => {
    cb(null, '../uploads/'); // Define la carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Define el nombre del archivo
  },
});

const upload = multer({ storage });

// POST request handler for /posteo
router.post('/', upload.single('image'), async (req, res) => {
  const { titulo, texto } = req.body;
  const { userId } = req.cookies.authToken; // Obtén el userId desde la cookie
  const image = req.file ? req.file.filename : null; // Obtén el nombre de la imagen

  const postId = uuidv4();
  const insertQuery = 'INSERT INTO posts (postId, userId, title, body, createdAt, image) VALUES (?, ?, ?, ?, ?, ?)';
  const queryParams = [postId, userId, titulo, texto, new Date(), image];

  db.query(insertQuery, queryParams, (err, result) => {
    if (err) {
      console.error('Error al guardar el posteo:', err);
      return res.status(500).json({ error: 'Error al guardar el posteo en la base de datos.' });
    }

    if (result && result.affectedRows > 0) {
      res.status(201).json({ message: 'Posteo guardado exitosamente.', postId });
    } else {
      res.status(500).json({ error: 'Error al guardar el posteo en la base de datos.' });
    }
  });
});

module.exports = router;