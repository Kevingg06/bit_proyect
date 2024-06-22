const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/registerController');
router.post('/', RegisterController.createUser);
router.get('/getUsers', RegisterController.getUsers);
router.get('/name', RegisterController.getUserByEmail);




module.exports = router;
