const express = require('express');
const materiaController = require('../controllers/materiaController');
const authController = require('../controllers/authController');

const router = express.Router();

// Rota para obter todas as matérias e criar uma nova matéria
router.route('/')
  .get(materiaController.getAllMaterias) // Obtém todas as matérias
  .post(
    authController.protect, // Protege a rota para usuários autenticados
    materiaController.postMateria // Cria uma nova matéria
  );

// Rota para obter estatísticas das matérias
router.route('/stats')
  .get(materiaController.stats); // Obtém estatísticas das matérias

// Rota para obter uma disciplina específica pelo ID da matéria
router.route('/materia/:id')
  .get(materiaController.getDisciplina); // Obtém uma disciplina específica

// Rota para obter, atualizar ou deletar uma matéria pelo ID
router.route('/:id')
  .get(materiaController.getMateria) // Obtém uma matéria específica
  .patch(
    authController.protect, // Protege a rota para usuários autenticados
    materiaController.updateMateria // Atualiza uma matéria específica
  )
  .delete(
    authController.protect, // Protege a rota para usuários autenticados
    authController.restrictTo('admin', 'dev'), // Restrição de acesso para 'admin' e 'dev'
    materiaController.deleteMateria // Deleta uma matéria específica
  );

module.exports = router;
