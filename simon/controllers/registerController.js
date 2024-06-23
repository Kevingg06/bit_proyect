const db = require('../config');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'messidios';
const { v4: uuidv4 } = require('uuid');


// exports.getUsers = (req, res) => {
//     db.query('SELECT * FROM users', (err, results) => {
//         if (err) {
//             console.error('Error al obtener usuarios:', err);
//             return res.status(500).json({ error: 'Error al obtener usuarios.' });
//         }
//         res.status(200).json(results);
//     });
// };

// Obtener un usuario por su email

// exports.getUserByEmail = (req, res) => {
//     const { email } = req.body;
//     db.query('SELECT * FROM users WHERE mail = ?', [email], (err, results) => {
//         if (err) {
//             console.error('Error al obtener usuario por email:', err);
//             return res.status(500).json({ error: 'Error al obtener usuario por email.' });
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Usuario no encontrado.' });
//         }
//         res.status(200).json(results[0]);
//     });
// };