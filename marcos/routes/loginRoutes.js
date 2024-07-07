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


router.post('/', (req, res) => {
    const { email, contraseña } = req.body;

    // Validar que se han proporcionado email y contraseña
    if (!email || !contraseña) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    }

    // Consultar la base de datos para verificar las credenciales
    const query = 'SELECT * FROM users WHERE mail = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error al autenticar usuario:', err);
            return res.status(500).json({ error: 'Error al autenticar usuario.' });
        }

        // Verificar si se encontró un usuario con el email proporcionado
        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas. Verifica tu email y contraseña.' });
        }

        const user = results[0];

        try {
            // Comparar la contraseña proporcionada con la contraseña encriptada almacenada
            const passwordMatch = await bcrypt.compare(contraseña, user.userPassword);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Credenciales incorrectas. Verifica tu email y contraseña.' });
            }

            // Generar un token JWT
            const token = jwt.sign({ userId: user.userId, email: user.mail, role: user.role }, secretKey);
            console.log('Configurando la cookie con el token:', token); // Log para verificar el token

            // Enviar el token como una cookie o en la respuesta JSON
            res.cookie('authToken', token, { httpOnly: true, sameSite: 'Lax', secure: false,  domain: 'localhost', path: '/'  });
            res.status(200).json({ message: 'Login exitoso.', token });
        } catch (error) {
            console.error('Error al comparar contraseñas:', error);
            res.status(500).json({ error: 'Error al autenticar usuario.' });
        }
    });
});


router.get('/usuario', verifyToken, (req, res) => {
    console.log('Solicitud recibida en /usuario');
  console.log('Usuario autenticado:', req.user);
    const query = 'SELECT username FROM users WHERE userId = ?';
    db.query(query, [req.user.userId], (err, results) => {
        if (err) {
            console.error('Error al obtener el nombre del usuario:', err);
            return res.status(500).json({ error: 'Error al obtener la información del usuario.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        res.json({ nombre: results[0].username });
    });
});

module.exports = router;