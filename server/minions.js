const { application } = require('express');
const express = require('express');
const minionsRouter = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('./db');
  
//Route handlers - need middleware for error checking  
//get array of all minions  
minionsRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('minions'));
});

//create a new minion 
minionsRouter.post('/', (req, res, next) => {
    const newMinion = req.body;
    addToDatabase('minions', newMinion);
    res.status(201).send(newMinion);
});

//should create middleware for issues with minionId
//get a minion by id
minionsRouter.get('/:minionId',(req, res, next) => {
    res.status(200).send(getFromDatabaseById('minions', req.params.minionId));
});

//update a minion by id
minionsRouter.put('/:minionId',(req, res, next) => {
    updateInstanceInDatabase('minions', req.body);
    res.status(204).send(getFromDatabaseById('minions', req.params.minionId));
});

//delete a minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = minionsRouter;