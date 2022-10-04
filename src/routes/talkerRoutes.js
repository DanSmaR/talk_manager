const express = require('express');
const { getAllTalkers, getTalkerById } = require('../utils/fsUtils');

const router = express.Router();

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

module.exports = router;
