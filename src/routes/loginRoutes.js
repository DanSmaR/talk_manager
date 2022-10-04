const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Joi = require('joi');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;
