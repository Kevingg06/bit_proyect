const db = require('../config');
const secretKey = 'tu_clave_secreta';
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



exports.createUser = (req, res) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: 'No se proporcionó token de autenticación.' });
    }

    // Verificar el token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido.' });
        }

        // El token es válido, proceder con la creación del usuario
        const { nombre, email, direccion, contraseña } = req.body;

        // Verificar que el email del token coincide con el email en el cuerpo de la solicitud
        if (decoded.email !== email) {
            return res.status(401).json({ error: 'El email del token no coincide con el email proporcionado.' });
        }

        // Insertar usuario en la base de datos
        const insertQuery = 'INSERT INTO users (username, mail, direccion, userPassword) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [nombre, email, direccion, contraseña], (err, result) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return res.status(500).json({ error: 'Error al registrar usuario.' });
            }

            res.status(201).json({ message: 'Usuario registrado exitosamente.' });
        });
    });
};

// Función para obtener un usuario por su email
exports.getUserByEmail = (req, res) => {
    const { email } = req.params;

    const selectQuery = 'SELECT * FROM users WHERE mail = ?';
    db.query(selectQuery, [email], (err, results) => {
        if (err) {
            console.error('Error al obtener usuario:', err);
            res.status(500).json({ error: 'Error al obtener usuario.' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado.' });
            return;
        }

        const user = results[0];
        res.status(200).json(user);
    });
};

exports.getUsers = (req, res) => {
    const selectQuery = 'SELECT * FROM users';
    
    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ error: 'Error al obtener usuarios.' });
            return;
        }

        res.status(200).json(results);
    });
};
