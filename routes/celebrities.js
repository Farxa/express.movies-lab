const router = require("express").Router();
const { render } = require("../app");
const Celebrity = require("../models/Celebrity");
const Cebelrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
                .then(celebsFromDB => {
                    console.log(celebsFromDB);
                    res.render('celebritiesFolder', { celebList: celebsFromDB });
                })
                .catch(err => {
                    next(err);
                })
})

module.exports = router;