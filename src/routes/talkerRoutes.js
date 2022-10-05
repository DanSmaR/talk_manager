const express = require('express');
const { validateNewTalker, checkHasTalker } = require('../middlewares/validateTalker');
const validateToken = require('../middlewares/validateToken');
const { 
  getTalkers, getOneTalker, removeTalker, insertTalker, editTalker, searchTalkerByName,
} = require('../controllers/talker');

const router = express.Router();

router.get('/search', validateToken, searchTalkerByName);

router.get('/', getTalkers);

router.get('/:talkerId', checkHasTalker, getOneTalker);

router.delete('/:talkerId', validateToken, checkHasTalker, removeTalker);

router.use(validateToken, validateNewTalker);

router.post('/', insertTalker);

router.put('/:talkerId', checkHasTalker, editTalker);

module.exports = router;
