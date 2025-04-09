const Anotacao = require("./../models/anotacaoModel");
const APIFeature = require("../utils/apiFeatures");
const cathAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Rota para obter uma lei específica pelo seu ID
exports.getAnotacao = cathAsync(async (req, res, next) => {

    // Consulta o banco de dados para encontrar uma lei pelo seu ID
    const lei = await Lei.findById(req.params.id);

    if(!lei){ new AppError('Não foi possível encontrar o recursos', 404)};

    // Responde com um código de status 200 e um objeto JSON contendo a lei encontrada
    res.status(200).json({ lei });

});

// Rota para criar uma nova anotação
exports.createAnotacao = cathAsync(async (req, res, next) => {

    // Cria uma nova lei com base nos dados do corpo da solicitação
    const newLei = await Anotacao.create(req.body);

    if(!newLei){ new AppError('Não foi possível encontrar a anotação', 404)};

    // Responde com um código de status 200 e um objeto JSON contendo a nova lei criada
    res.status(200).json({
        status: "sucesso",
        data: {
            lei: newLei
    }})
});

exports.deleteAnotacao = cathAsync(async (req, res, next) => {
    const user = await Anotacao.findByIdAndDelete(req.params.id);
  
    if (!user) {
      return next(new AppError("Não há anotação com essa ID", 404));
    }
  
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
  
  exports.updateAnotacao = cathAsync(async (req, res, next) => {
    const materia = await Anotacao.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  
    if (!materia) {
      return next(new AppError("Não há anotacão com essa ID", 404));
    }
  
    res.status(204).json({
      status: "success",
      data: null,
    });
  });