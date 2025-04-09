const Materia = require("./../models/materiaModel");
const Anotacao = require("./../models/anotacaoModel");
const APIFeature = require("../utils/apiFeatures");
const cathAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Rota para obter todas as leis do banco de dados com apenas _id e nome
exports.getAllMaterias = cathAsync(async (req, res, next) => {

  // Execute query
  const features = new APIFeature(Materia.find(), req.query, req.headers.id)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  let materia = await features.query;

  materia = await

    // Responde com um código de status 200 e um objeto JSON contendo as leis encontradas
    res.status(200).json({ materia });
});

// Rota para obter uma materia específica pelo seu ID
exports.getMateria = cathAsync(async (req, res, next) => {

  const materia = await Materia.findOneAndUpdate(
    { _id: req.params.id }, // Filtro para encontrar o documento
    { $inc: { views: 1 } }, // Incrementa o campo 'views' em 1
    { new: true } // Retorna o documento atualizado
  );

  const anotacoes = await Anotacao.find({ materiaId: req.params.idAutor });

  if (!materia) {
    return next(new AppError("Não foi possível encontrar o recurso", 404));
  }

  // Responde com um código de status 200 e um objeto JSON contendo a lei encontrada
  res.status(200).json({ materia: materia, anotacoes: anotacao });
});

/*exports.getDisciplina = cathAsync(async (req, res, next) => {
  const stats = await Materia.aggregate([
    [
      {
        '$match': {
          'disciplina': {
            '$eq': 2
          }
        }
      }
    ]
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});*/

exports.postMateria = cathAsync(async (req, res) => {
  // Cria uma nova materia com base nos dados do corpo da solicitação
  const materia = await Materia.create(req.body);

  if (!materia) {
    new AppError("Não foi possível encontrar o recursos", 404);
  }

  // Responde com um código de status 200 e um objeto JSON contendo a nova lei criada
  res.status(200).json({
    status: "sucesso",
    data: materia,
  });
});

exports.deleteMateria = cathAsync(async (req, res, next) => {
  const user = await Materia.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("Não há materia com essa ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateMateria = cathAsync(async (req, res, next) => {
  const materia = await Materia.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!materia) {
    return next(new AppError("Não há materia com essa ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.stats = cathAsync(async (req, res, next) => {
  const disciplina = req.query.disciplina;

  const stats = await Materia.aggregate([
    {
      '$match': {
        'disciplina': {
          '$regex': disciplina,
          '$options': 'i'
        }
      }
    }, {
      '$group': {
        '_id': 'stats',
        'todasDisciplinas': {
          '$addToSet': '$assunto'
        },
        'todosTemas': {
          '$addToSet': '$disciplina'
        },
        'totalMaterias': {
          '$sum': 1
        }
      }
    }
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});
