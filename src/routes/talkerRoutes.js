const express = require('express');
const { getAllTalkers, addNewTalker, updateTalker, deleteTalker } = require('../utils/fsUtils');
const { validateNewTalker, checkHasTalker } = require('../middlewares/validateTalker');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  if (!talkers) return res.status(500).json({ message: 'data not found' });
  res.status(200).json(talkers);
});

router.get('/:talkerId', checkHasTalker, async (req, res) => {
  res.status(200).json(req.talker);
});

router.delete('/:talkerId', validateToken, checkHasTalker, async (req, res) => {
  const { talkerId } = req.params;
  const isTalkerDeleted = await deleteTalker(Number(talkerId));
  if (!isTalkerDeleted) return res.status(500).json({ message: 'talker not deleted' });
  res.status(204).end();
});

router.use(validateToken, validateNewTalker);

router.post('/', async (req, res) => {
  const newTalker = await addNewTalker(req.body);
  if (!newTalker) return res.status(500).json({ message: 'Talker not created' });
  res.status(201).json(newTalker);
});

router.put('/:talkerId', checkHasTalker, async (req, res) => {
  const { talkerId } = req.params;
  const newTalkerData = req.body;
  const talkerUpdated = await updateTalker(Number(talkerId), newTalkerData);
  if (!talkerUpdated) return res.status(500).json({ message: 'talker not updated' });
  res.status(200).json(talkerUpdated);
});

module.exports = router;
