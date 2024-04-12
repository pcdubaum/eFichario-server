const express = require('express');
const materiaController = require('../controllers/materiaController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
.get(materiaController.getAllMaterias)
.post(authController.protect,
    materiaController.newMateria);

router.route('/:concurso/:tema')
  .get(
    materiaController.getMateriaConcurso
  );


router
.route('/:id')
.get(materiaController.getMateria)
.patch(
    authController.protect,
    materiaController.updateMateria
)
.delete(
    authController.protect, 
    authController.restrictTo('admin', 'dev'), 
    materiaController.deleteMateria
    );



module.exports = router;