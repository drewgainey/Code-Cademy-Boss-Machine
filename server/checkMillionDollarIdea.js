const checkMillionDollarIdea = (req, res, next) => {
    ideaValue = parseInt(req.body.numWeeks) * parseIngt(req.body.weeklyRevenue);
    if (ideaValue >= 1000000) {
        next();
    }
    res.status(400).send();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
