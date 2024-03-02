const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protect all routes after this middleware
//router.use(authController.protect);

router
.route('/')
.get(usuarioController.pegarTodosUsuarios)
.post(authController.protect, usuarioController.createUser);

router
.route('/:id')
.delete(usuarioController.removeUser);

module.exports = router;


