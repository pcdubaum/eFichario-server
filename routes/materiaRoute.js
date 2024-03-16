const express = require('express');
const materiaController = require('../controllers/materiaController');

const router = express.Router();

router.route('/')
.get(materiaController.getAllMaterias)
.post(materiaController.newMateria);

router
.route('/:id')
.get(materiaController.getMateria)
.delete(materiaController.deleteMateria);



module.exports = router;