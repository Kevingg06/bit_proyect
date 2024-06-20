// usersRoutes.js
const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/userController');

// Ruta para obtener todos los usuarios
router.get('/', UsersController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/:userId', UsersController.getUserById);

// Ruta para crear un nuevo usuario
router.post('/', UsersController.createUser);

// Ruta para actualizar un usuario
router.put('/:userId', UsersController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:userId', UsersController.deleteUser);

module.exports = router;