'use strict'

const repository = require('../repositories/productRepository');
const ValidatorContract = require('../validators/fluent-validator');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        resposta(res, data);
    } catch(e) {
        falha(res, 'Falha ao processar a requisição');
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        resposta(res, data);
    } catch(e) {
        falha(res, 'Falha ao processar a requisição');
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        resposta(res, data);
    } catch(e) {
        falha(res, 'Falha ao processar a requisição');
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        resposta(res, data);
    } catch(e) {
        falha(res, 'Falha ao processar a requisição');
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        resposta(res, contract.errors(), 400).end();
        return;
    }

    try {
        await repository.create(req.body);
        sucesso(res, 'Produto cadastrado com sucesso!', 201);
    } catch(e) {
        console.log(e);
        falha(res, 'Falha ao processar a requisição');
    }
}

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        sucesso(res, 'Produto atualizado com sucesso!');
    } catch(e) {
        falha(res, 'Falha ao processar a requisição');
    }
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        sucesso(res, 'Produto removido com sucesso!');
    } catch(e) {
        falha(res, 'Falha ao processar a requisição');
    }
}

function sucesso(res, message, statusCode = 200) {
    return resposta(res, { message: message }, statusCode);
}

function falha(res, message, statusCode = 500) {
    return resposta(res, { message: message }, statusCode);
}

function resposta(res, data, statusCode = 200) {
    return res.status(statusCode).send(data);
}