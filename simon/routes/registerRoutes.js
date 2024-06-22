const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/registerController');

router.get('/', RegisterController.getUsers);
router.get('/name', RegisterController.getUserByEmail);


router.post('/', RegisterController.createUser);

module.exports = router;
