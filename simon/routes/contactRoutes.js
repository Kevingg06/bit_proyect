// contactRoutes.js
const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');

// Ruta para obtener todos los contactos
router.get('/', ContactController.getAllContacts);

// Ruta para obtener un contacto por su ID
router.get('/:id', ContactController.getContactById);

// Ruta para crear un nuevo contacto
router.post('/', ContactController.createContact);

// Ruta para actualizar un contacto
router.put('/:id', ContactController.updateContact);

// Ruta para eliminar un contacto
router.delete('/:id', ContactController.deleteContact);

module.exports = router;