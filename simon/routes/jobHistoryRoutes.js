// jobHistoryRoutes.js
const express = require('express');
const router = express.Router();
const JobHistoryController = require('../controllers/jobHistoryController');

// Ruta para obtener todo el historial laboral
router.get('/', JobHistoryController.getAllJobHistory);

// Ruta para obtener el historial laboral de un usuario por su ID
router.get('/user/:userId', JobHistoryController.getJobHistoryByUserId);

// Ruta para crear un nuevo registro de historial laboral
router.post('/', JobHistoryController.createJobHistory);

// Ruta para actualizar un registro de historial laboral
router.put('/:userId/:companyName', JobHistoryController.updateJobHistory);

// Ruta para eliminar un registro de historial laboral
router.delete('/:userId/:companyName', JobHistoryController.deleteJobHistory);

module.exports = router;