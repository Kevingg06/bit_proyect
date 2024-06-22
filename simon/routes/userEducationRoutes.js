// userEducationRoutes.js
const express = require('express');
const router = express.Router();
const UserEducationController = require('../controllers/userEducationController');

// Ruta para obtener la educación de un usuario por su ID
router.get('/:userId', UserEducationController.getUserEducationByUserId);

// Ruta para crear un nuevo registro de educación de usuario
router.post('/', UserEducationController.createUserEducation);

// Ruta para actualizar un registro de educación de usuario
router.put('/:id', UserEducationController.updateUserEducation);

// Ruta para eliminar un registro de educación de usuario
router.delete('/:id', UserEducationController.deleteUserEducation);

module.exports = router;
