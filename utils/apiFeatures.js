const Materia = require("../models/materiaModel");

// Classe para processar e modificar a consulta da API
class APIFeatures {
  constructor(query, queryString, id) {
    this.query = query;
    this.queryString = queryString;
    this.id = id;
  }

  // Filtra os resultados da consulta com base nos parâmetros fornecidos na string de consulta
  filter() {
    // Objeto de consulta recebido da API
    const queryObj = { ...this.queryString };
    const camposExcluidos = ["page", "sort", "limit", "fields"];

    // Remove campos de controle da consulta
    camposExcluidos.forEach((el) => delete queryObj[el]);

    // Substitui operadores de comparação por operadores do MongoDB
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    console.log(this.id)
    this.query = this.query.find(JSON.parse(queryStr));
    this.query.find({
      $or: [
        {
          publico: {
            $eq: true,
          },
        },
        {
          autorId: {
            $eq: this.id,
          },
        },
      ],
    });

    return this;
  }

  // Ordena os resultados com base nos parâmetros de classificação fornecidos na string de consulta
  sort() {
    // Ordenação
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }

    return this;
  }

  // Limita os campos retornados na consulta com base nos parâmetros de campos fornecidos na string de consulta
  limitFields() {
    // Limitação de campos
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }

    return this;
  }

  // Pagina os resultados com base nos parâmetros de paginação fornecidos na string de consulta
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

// Exporta a classe APIFeatures para uso em outros arquivos
module.exports = APIFeatures;
