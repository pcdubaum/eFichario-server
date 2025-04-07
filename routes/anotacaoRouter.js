const express = require('express');
const anotacaoController = require('../controllers/anotacaoController');

const router = express.Router();


router.route('/:id')
.get(anotacaoController.getAnotacao)
.patch(anotacaoController.updateAnotacao)
.delete(anotacaoController.deleteAnotacao)



module.exports = router;