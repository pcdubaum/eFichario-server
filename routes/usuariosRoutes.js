const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logoff', authController.logoff);

// Protect all routes after this middleware
router.use(authController.protect);

router
.route('/')
.get(usuarioController.pegarTodosUsuarios)
.post(usuarioController.createUser);

// Middleware para restringir a administradores e desenvolvedores
router.use(authController.restrictTo('admin', 'dev'));

router
  .route('/:id')
  .patch(usuarioController.updateUser) // Adicionando atualização de usuário
  .delete(usuarioController.removeUser);

router.get('/me', usuarioController.getMe, usuarioController.getUser);

module.exports = router;


