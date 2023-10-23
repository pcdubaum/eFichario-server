const Lei = require('./../models/leiModel');
const APIFeature = require('./utils/apiFeatures');

// Rota para obter todas as leis do banco de dados com apenas _id e nome
exports.getAllLeis = async (req, res) => {
    try {
         // Execute query
        const features = new APIFeature(Lei.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

        const lei = await features.query;

        // Responde com um código de status 200 e um objeto JSON contendo as leis encontradas
        res.status(200).json({ lei });
    } catch (err) {
        res.status(304).json({
            erro: 'Vixi'
        })

        // Se ocorrer um erro, responde com um código de status 404 e uma mensagem de erro
        res.status(404).json({
            status: 'erro ' + err,
            message: 'Pegar lei específica'
        });
    }
};

// Rota para obter uma lei específica pelo seu ID
exports.getLei = async (req, res) => {
    try {
        // Consulta o banco de dados para encontrar uma lei pelo seu ID
        const lei = await Lei.findById(req.params.id);

        // Responde com um código de status 200 e um objeto JSON contendo a lei encontrada
        res.status(200).json({ lei });
    } catch (err) {
        // Se ocorrer um erro, responde com um código de status 404 e uma mensagem de erro
        res.status(404).json({
            status: 'erro ' + err,
            message: 'Pegar lei específica'
        });
    }
};

// Rota para criar uma nova lei
exports.createLei = async (req, res) => {
    console.log(req.body);
    try {
        // Cria uma nova lei com base nos dados do corpo da solicitação
        const newLei = await Lei.create(req.body);

        // Responde com um código de status 200 e um objeto JSON contendo a nova lei criada
        res.status(200).json({
            status: "sucesso",
            data: {
                lei: newLei
            }
        });
    } catch (err) {
        // Se ocorrer um erro, responde com um código de status 400 e uma mensagem de erro
        res.status(400).json({
            status: 'erro ' + err,
            message: err
        });
    }
};

// Rota para atualizar uma lei existente pelo seu ID
exports.updateLei = async (req, res) => {
    try {
        // Atualiza uma lei existente com base no ID fornecido e nos dados do corpo da solicitação
        const lei = await Lei.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Responde com um código de status 200 e um objeto JSON contendo a lei atualizada
        res.status(200).json({
            status: "sucesso",
            data: {
                lei: lei
            }
        });
    } catch (err) {
        // Se ocorrer um erro, responde com um código de status 404 e uma mensagem de erro
        res.status(404).json({
            status: 'erro ' + err,
            message: 'Atualizar lei específica'
        });
    }
};

// Rota para deletar uma lei pelo seu ID
exports.deleteLei = async (req, res) => {
    try {
        // Remove uma lei pelo seu ID fornecido
        await Lei.findByIdAndRemove(req.params.id);

        // Responde com um código de status 200 para indicar sucesso na exclusão
        res.status(200).json({
            status: "sucesso",
        });
    } catch (err) {
        // Se ocorrer um erro, responde com um código de status 404 e uma mensagem de erro
        res.status(404).json({
            status: 'erro ' + err,
            message: 'Deletar lei específica'
        });
    }
};
