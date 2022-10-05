const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Joi = require('joi');
const { saveToken } = require('../utils/fsUtils');

const router = express.Router();

router.use(bodyParser.json());

function convertErrorMessage(errorMessage) {
  if (errorMessage.search(/"email" is required/i) >= 0) {
    return 'O campo "email" é obrigatório';
  }

  if (errorMessage.search(/"email" must be/i) >= 0) {
    return 'O "email" deve ter o formato "email@email.com"';
  }

  if (errorMessage.search(/"password" is required/i) >= 0) {
    return 'O campo "password" é obrigatório';
  }

  if (errorMessage.search(/"password" length/i) >= 0) {
    return 'O "password" deve ter pelo menos 6 caracteres';
  }
}

function validateUserLogin(userDataObj) {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(userDataObj);
  return error;
}

router.post('/', async (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const error = validateUserLogin(req.body);
  if (error) {
    const message = convertErrorMessage(error.message);
    return res.status(400).json({ message });
  }
  await saveToken(token);
  res.status(200).json({ token });
});

module.exports = router;
