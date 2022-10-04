const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const PATH_TALKER_LIST = path.resolve(__dirname, '..', 'talker.json');

router.get('/', async (_req, res) => {
  const talkers = JSON.parse(await fs.readFile(PATH_TALKER_LIST, 'utf-8'));
  res.status(200).json(talkers);
});

module.exports = router;