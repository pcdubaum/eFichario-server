const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
.route('/')
.get(usuarioController.pegarTodosUsuarios)
.post(authController.protect, usuarioController.createUser);

module.exports = router;


