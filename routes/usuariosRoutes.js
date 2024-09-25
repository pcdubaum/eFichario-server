const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logoff', authController.logoff);

// Protect all routes after this middleware
//router.use(authController.protect);

router
.route('/')
.get(usuarioController.pegarTodosUsuarios)
.post(authController.protect, usuarioController.createUser);

// Protect all routes after this middleware
router.use(authController.protect);

router
.route('/:id', authController.restrictTo('admin', 'dev'))
.delete(usuarioController.removeUser);

router.get('/me', usuarioController.getMe, usuarioController.getUser);

module.exports = router;


