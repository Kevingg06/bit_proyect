// companyRoutes.js
const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/companyController');

// Ruta para obtener todas las compañías
router.get('/', CompanyController.getAllCompanies);

// Ruta para obtener una compañía por su nombre
router.get('/:name', CompanyController.getCompanyByName);

// Ruta para crear una nueva compañía
router.post('/', CompanyController.createCompany);

// Ruta para actualizar una compañía
router.put('/:name', CompanyController.updateCompany);

// Ruta para eliminar una compañía
router.delete('/:name', CompanyController.deleteCompany);

module.exports = router;