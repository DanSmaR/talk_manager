const fs = require('fs').promises;
const path = require('path');

const PATH_TALKER_LIST = path.resolve(__dirname, '..', 'talker.json');
const PATH_TOKEN = path.resolve(__dirname, '..', 'token.txt');

function getMaxId(talkerList) {
  const newUserList = [...talkerList];
  return newUserList.sort((a, b) => b.id - a.id)[0].id + 1;
}

async function getAllTalkers() {
  try {
    return JSON.parse(await fs.readFile(PATH_TALKER_LIST, 'utf-8'));
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getTalkerById(talkerId) {
  try {
    const talkersList = await getAllTalkers();
    return talkersList.find(({ id }) => id === talkerId);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function saveToken(token) {
  await fs.writeFile(PATH_TOKEN, token);
}

async function getToken() {
  try {
    return await fs.readFile(PATH_TOKEN, 'utf-8');
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function addNewTalker(newTalker) {
  try {
    const prevTalkersList = await getAllTalkers();
    const newTalkerWithId = {
      name: newTalker.name,
      age: newTalker.age,
      id: getMaxId(prevTalkersList),
      talk: newTalker.talk,
    };
    const newTalkerList = JSON.stringify([...prevTalkersList, newTalkerWithId], null, 2);
    await fs.writeFile(PATH_TALKER_LIST, newTalkerList);
    return newTalkerWithId;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateTalker(id, newTalkerData) {
  try {
    const prevTalkersList = await getAllTalkers();
    const updatedTalkersList = prevTalkersList.map((talker) => {
      if (talker.id === id) return { ...talker, ...newTalkerData };
      return talker;
    });
    await fs.writeFile(PATH_TALKER_LIST, JSON.stringify(updatedTalkersList, null, 2));
    return { id, ...newTalkerData };
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteTalker(id) {
  try {
    const prevTalkersList = await getAllTalkers();
    const updatedTalkersList = prevTalkersList.filter((talker) => talker.id !== id);
    await fs.writeFile(PATH_TALKER_LIST, JSON.stringify(updatedTalkersList, null, 2));
    return true;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  getAllTalkers,
  getTalkerById,
  saveToken,
  getToken,
  addNewTalker,
  updateTalker,
  deleteTalker,
};
