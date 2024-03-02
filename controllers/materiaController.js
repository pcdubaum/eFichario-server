const Materia = require('./../models/materiaModel');
const APIFeature = require('../utils/apiFeatures');
const cathAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Rota para obter todas as leis do banco de dados com apenas _id e nome
exports.getAllMaterias= cathAsync(async (req, res, next) => {

    // Execute query
   const features = new APIFeature(Materia.find(), req.query)
   .filter()
   .sort()
   .limitFields()
   .paginate();

   const materia = await features.query;

   // Responde com um código de status 200 e um objeto JSON contendo as leis encontradas
   res.status(200).json({ materia });
});

// Rota para obter uma materia específica pelo seu ID
exports.getMateria = cathAsync(async (req, res, next) => {

    // Consulta o banco de dados para encontrar uma lei pelo seu ID
    console.log(req.params.id);
    const materia = await Materia.findById(req.params.id);

    if(!materia){ new AppError('Não foi possível encontrar o recursos', 404)};

    // Responde com um código de status 200 e um objeto JSON contendo a lei encontrada
    res.status(200).json({ materia: materia });

});