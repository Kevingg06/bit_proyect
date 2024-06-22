const express = require('express'); 
const router = express.Router();
const cors = require('cors');
const RegisterController = require('../controllers/registerController');
const { v4: uuidv4 } = require('uuid');
const secretKey = process.env.SECRET_KEY || 'messidios';

router.use(cors());

router.post('/register', (req, res)=> {
const { nombre, email, direccion, contraseña, edad } = req.body;

    let role;
    if (direccion) {
        // Registro de empresa
        role = 'empresa';
    } else if (edad) {
        // Registro de empleado
        role = 'empleado';
    } else {
        return res.status(400).json({ error: 'Datos de registro incompletos.' });
    }

    // Crear token JWT
    const token = jwt.sign({ email, role }, secretKey);

    // Insertar usuario en la base de datos
    const insertQuery = 'INSERT INTO users (userId, username, userPassword, role, createdAt, contactsNumber, age, phoneNumber, mail, subscription, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const queryParams = [uuidv4(), nombre, contraseña, role, new Date(), null, edad || null, null, email, false, direccion || null];

    db.query(insertQuery, queryParams, (err, result) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            return res.status(500).json({ error: 'Error al registrar usuario.' });
        }

        // Enviar token como una cookie
        res.cookie('authToken', token, { httpOnly: true });
        res.status(201).json({ message: 'Usuario registrado exitosamente.', token });
    });
});

router.get('/getUsers', RegisterController.getUsers);
router.get('/name', RegisterController.getUserByEmail);




module.exports = router;
