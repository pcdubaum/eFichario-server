const express = require('express');
const anotacaoController = require('../controllers/anotacaoController');
const authController = require('../controllers/authController');

const router = express.Router();

// Rota para obter todas as matérias e criar uma nova matéria
router.route('/')
  .post(
    authController.protect, // Protege a rota para usuários autenticados
    anotacaoController.createAnotacao // Cria uma nova matéria
  );

router.route('/:id')
.get(anotacaoController.getAnotacao)
.post(anotacaoController.createAnotacao)
.patch(anotacaoController.updateAnotacao)
.delete(anotacaoController.deleteAnotacao)



module.exports = router;