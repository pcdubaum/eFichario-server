const Lei = require('./../models/leiModel');
const APIFeature = require('../utils/apiFeatures');
const cathAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Rota para obter todas as leis do banco de dados com apenas _id e nome
exports.getAllLeis = cathAsync(async (req, res, next) => {

         // Execute query
        const features = new APIFeature(Lei.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

        const lei = await features.query;

        // Responde com um código de status 200 e um objeto JSON contendo as leis encontradas
        res.status(200).json({ lei });
});

// Rota para obter uma lei específica pelo seu ID
exports.getLei = cathAsync(async (req, res, next) => {

        // Consulta o banco de dados para encontrar uma lei pelo seu ID
        const lei = await Lei.findById(req.params.id);

        if(!lei){ new AppError('Não foi possível encontrar o recursos', 404)};

        // Responde com um código de status 200 e um objeto JSON contendo a lei encontrada
        res.status(200).json({ lei });
   
    });



// Rota para criar uma nova lei
exports.createLei = cathAsync(async (req, res, next) => {

        // Cria uma nova lei com base nos dados do corpo da solicitação
        const newLei = await Lei.create(req.body);

        if(!newLei){ new AppError('Não foi possível encontrar o recursos', 404)};

        // Responde com um código de status 200 e um objeto JSON contendo a nova lei criada
        res.status(200).json({
            status: "sucesso",
            data: {
                lei: newLei
        }})
});
    



// Rota para atualizar uma lei existente pelo seu ID
exports.updateLei = cathAsync(async (req, res, next) => {
  
        // Atualiza uma lei existente com base no ID fornecido e nos dados do corpo da solicitação
        const lei = await Lei.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!lei){ new AppError('Não foi possível encontrar o recursos', 404)};

        // Responde com um código de status 200 e um objeto JSON contendo a lei atualizada
        res.status(200).json({
            status: "sucesso",
            data: {
                lei: lei
            }
        });
   
});

// Rota para deletar uma lei pelo seu ID
exports.deleteLei = cathAsync(async (req, re, next) => {
        // Remove uma lei pelo seu ID fornecido
        await Lei.findByIdAndRemove(req.params.id);

        // Responde com um código de status 200 para indicar sucesso na exclusão
        res.status(200).json({
            status: "sucesso",
        });
   
});

exports.getLeiStats = cathAsync(async (req, res, next) =>{

        const stats = Lei.aggregate([])
   
});
