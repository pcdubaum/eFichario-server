const { query } = require('express');
const Lei = require('./../models/leiModel');

// Rota para obter todas as leis do banco de dados com apenas _id e nome
exports.getAllLeis = async (req, res) => {
    try {
        // Nossa query de pesquisa recebida pela api
        const queryObj = {...req.query};
        const camposExcluidos = ['page', 'sort', 'limit', 'fields'];
        camposExcluidos.forEach(el => delete queryObj[el]);

        // Substituir operadores de comparação por operadores do MongoDB
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Lei.find(queryObj);

        // Sorting
        if(req.query.sort){
            const sortBy = req.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }

        // Field limiting
        if(req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)
        }
        else{
            // Remoce o campo __v
            query = query.select('-__v');
        }

        // Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 50;
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit);

        if(req.query.page){
            const numLeis = await Lei.countDocuments();
            if(skip >= numLeis) 
                throw new Error('This page does not exist');
        }

        const lei = await query;

        // Responde com um código de status 200 e um objeto JSON contendo as leis encontradas
        res.status(200).json({ lei });
    } catch (err) {
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
            new: true
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
