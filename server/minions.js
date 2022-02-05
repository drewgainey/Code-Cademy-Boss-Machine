const { application } = require('express');
const express = require('express');
const minionsRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

//check for valid minion
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        next();
    } else {
        const err = new Error('invalid minion id');
        err.status = 404;
        return next(err);
    }
}); 

//Route handlers   
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
    const updatedMinion = req.body;
    updateInstanceInDatabase('minions', updatedMinion);
    res.send(updatedMinion);
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

//error handling
minionsRouter.use((err, req, res, next) => {
    if(!err.status) {
        err.status = 500;
    }
    res.status(err.status).send(err.message);
});

module.exports = minionsRouter;