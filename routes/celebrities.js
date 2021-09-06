const router = require("express").Router();
const { render } = require("../app");
const Celebrity = require("../models/Celebrity");
const Cebelrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
                .then(celebsFromDB => {
                    //console.log(celebsFromDB);
                    res.render('celebritiesFolder', { celebList: celebsFromDB });
                })
                .catch(err => {
                    next(err);
                })
})

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebritiesFolder/new.hbs');
})


router.post('/celebrities', (req, res, next) => {
	console.log(req.body);
	const { name, occupation, catchPhrase, meme } = req.body;
	Cebelrity.create({
		name: name,
		occupation: occupation,
		catchPhrase: catchPhrase,
		meme: meme
	})
		.then(createdCeleb => {
            
			res.redirect(`celebrities/${createdCeleb._id}`);
		})
        .catch(err => res.render('celebritiesFolder/new'))

});

router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
                .then(celebFromDB => {
                    //console.log(celebFromDB);
                    res.render('celebritiesFolder/show', { celebrity: celebFromDB});
                })
                .catch(err => {
                    next(err);
                })
})


router.post('/celebrities/:id/delete', (req, res, next) => {
	const celebId = req.params.id;
	Celebrity.findByIdAndDelete(celebId)
		.then(() => {
			res.redirect('/celebrities');
		})
		.catch(err => {
			next(err);
		})
});

router.get('/celebrities/:id/edit', (req, res, next) => {
    const celebId = req.params.id;
    Celebrity.findById(celebId)
    .then(celebrities => {
        res.render('celebritiesFolder/edit', { celebrities });
    })
    .catch(err => {
        next(err);
    })
});

router.post('/celebrities/:id/edit', (req, res, next) => {
    const celebId = req.params.id;
    const {name, occupation, catchphrase, meme} = req.body;
    Celebrity.findByIdAndUpdate(celebId, {
        name: name,
        occupation: occupation,
        catchphrase: catchphrase,
        meme: meme
    }, { new: true })  
    .then((updatedCeleb) => {
        res.redirect(`/celebrities/${updatedCeleb._id}`);
    })
    .catch(err => {
        next(err);
    })
});


module.exports = router;