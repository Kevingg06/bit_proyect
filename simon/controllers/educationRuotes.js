// educationRoutes.js
const express = require('express');
const router = express.Router();
const EducationController = require('../controllers/educationController');

// Ruta para obtener toda la información educativa
router.get('/', EducationController.getAllEducation);

// Ruta para obtener información educativa por nombre
router.get('/:name', EducationController.getEducationByName);

// Ruta para crear nueva información educativa
router.post('/', EducationController.createEducation);

// Ruta para actualizar información educativa
router.put('/:name', EducationController.updateEducation);

// Ruta para eliminar información educativa
router.delete('/:name', EducationController.deleteEducation);

module.exports = router;