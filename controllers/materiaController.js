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

exports.newMateria = cathAsync(async (req, res) => {

     // Cria uma nova materia com base nos dados do corpo da solicitação
     const newMateria = await Materia.create(req.body);

     if(!newMateria){ 
        new AppError('Não foi possível encontrar o recursos', 404)
    };

     // Responde com um código de status 200 e um objeto JSON contendo a nova lei criada
     res.status(200).json({
         status: "sucesso",
         data: newMateria})
})

exports.deleteMateria = cathAsync(async (req, res, next) => {

    const user = await Materia.findByIdAndDelete(req.params.id)

    if (!user) {
      return next(new AppError('Não há usuário com essa ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });