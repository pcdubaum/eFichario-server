const express = require('express');
const materiaController = require('../controllers/materiaController');

const router = express.Router();

router.route('/')
.get(materiaController.getAllMaterias);

router
.route('/:id')
.get(materiaController.getMateria);



module.exports = router;