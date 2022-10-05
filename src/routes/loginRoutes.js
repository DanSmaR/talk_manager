const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { saveToken } = require('../utils/fsUtils');
const validateUserLogin = require('../middlewares/validateLogin');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', validateUserLogin, async (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  await saveToken(token);
  res.status(200).json({ token });
});

module.exports = router;
