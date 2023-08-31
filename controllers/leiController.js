const Lei = require('./../models/leiModel');

exports.getAllLeis = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'pegar todas as lei'
    });
};

exports.getLei = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Pegar lei específica'
    });
};

exports.createLei = async (req, res) => {
    try {
        const newLei = await Lei.create(req.body);

        res.status(201).json({
            status: "sucesso",
            data: {
                lei: newLei
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "falha",
            message: err
        })
    }
};

exports.updateLei = (req, res) => {

};

exports.deleteLei = (req, res) => {

};