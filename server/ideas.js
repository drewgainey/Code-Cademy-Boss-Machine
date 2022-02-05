const express = require('express');
const ideasRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');


//check for valid idea
ideasRouter.param('ideaId', (req, res, next, id) => {
    const validIdea = getFromDatabaseById('ideas', id);
    if (validIdea) {
        next();
    } else {
        const err = new Error('invalid idea id');
        err.status = 404;
        return  next(err);
    }
});

//Route Handlers
// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('ideas'));
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/',(req, res, next) => {
    const newIdea = req.body;
    addToDatabase('ideas', newIdea);
    res.status(201).send(newIdea);
});
// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    res.status(200).send(getFromDatabaseById('ideas', ideaId));
});
// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = req.body;
    updateInstanceInDatabase('ideas', updatedIdea);
    res.send(updatedIdea);
});
// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

//error handling
ideasRouter.use((err, req, res, next) => {
    if(!err.status) {
        err.status = 500;
    }
    res.status(err.status).send(err.message);
});

module.exports = ideasRouter;