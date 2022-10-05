const express = require('express');
const { getAllTalkers, addNewTalker } = require('../utils/fsUtils');
const { validateNewTalker, checkHasTalker } = require('../middlewares/validateTalker');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(200).json(talkers);
});

router.get('/:talkerId', checkHasTalker, async (req, res) => {
  res.status(200).json(req.talker);
});

router.post('/', validateToken, validateNewTalker, async (req, res) => {
  const newTalker = await addNewTalker(req.body);
  res.status(201).json(newTalker);
});

module.exports = router;
