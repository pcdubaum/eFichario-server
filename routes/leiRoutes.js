const express = require('express');
const leiController = require('../controllers/leiController');
const router = express.Router();

router.route('/')
.get(leiController.getAllLeis)
.post(leiController.createLei);

router.route('/:id')
.get(leiController.getLei)
.patch(leiController.updateLei)
.delete(leiController.deleteLei);


module.exports = router;