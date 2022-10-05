const express = require('express');
const Joi = require('joi');
const { getAllTalkers, getTalkerById, getToken, addNewTalker } = require('../utils/fsUtils');

const router = express.Router();

const nameErrMsg = {
  'string.min': 'O "name" deve ter pelo menos 3 caracteres',
  'any.required': 'O campo "name" é obrigatório',
};

const ageErrMsg = {
  'number.min': 'A pessoa palestrante deve ser maior de idade',
  'any.required': 'O campo "age" é obrigatório',
};

const watchedAtErrMsg = {
  'any.required': 'O campo "watchedAt" é obrigatório',
  'string.pattern.base': 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
};

const rateErrMsg = {
  'any.required': 'O campo "rate" é obrigatório',
  'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
  'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
};

const talkErrMsg = {
  'any.required': 'O campo "talk" é obrigatório',
};

async function isTokenValid(userToken) {
  const tokenInDatabase = await getToken();
  return userToken === tokenInDatabase;
}

function validateNewTalker(talkerObj) {
  const talkObjKeySchema = Joi.object().keys({
    watchedAt: Joi.string().pattern(/[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}/).required()
      .messages(watchedAtErrMsg),
    rate: Joi.number().integer().min(1).max(5)
      .required()
      .messages(rateErrMsg),
  });
  const schema = Joi.object().keys({
    name: Joi.string().trim().min(3).required()
      .messages(nameErrMsg),
    age: Joi.number().min(18).required().messages(ageErrMsg),
    talk: talkObjKeySchema.required().messages(talkErrMsg),
  });

  const { error } = schema.validate(talkerObj);
  return error;
}

router.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(200).json(talkers);
});

router.get('/:talkerId', async (req, res) => {
  const { talkerId } = req.params;
  const talker = await getTalkerById(Number(talkerId));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

router.post('/', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  const isTokenConfirmed = await isTokenValid(token);
  if (!isTokenConfirmed) return res.status(401).json({ message: 'Token inválido' });
  const error = validateNewTalker(req.body);
  console.log(error);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const newTalker = await addNewTalker(req.body);
  res.status(201).json(newTalker);
});

module.exports = router;
