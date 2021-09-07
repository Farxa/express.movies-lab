const router = require("express").Router();
const { render } = require("../app");
const Celebrity = require("../models/Celebrity");
const Movie = require("../models/Movie");


router.get('/movies/new', (req, res, next) => {
    Celebrity.find()
		.then(celebsFromDB => {
			//console.log(celebsFromDB);
			res.render('moviesFolder/new.hbs', { celebs: celebsFromDB });
		})
        .catch(err => {
            next(err);
        })
})



router.post('/movies', (req, res, next) => {
	//console.log(req.body);
	const { title, genre, plot, cast } = req.body;
	Movie.create({
		title: title,
		genre: genre,
		plot: plot,
		cast: cast
	})
		.then(createdMovie => {
			//console.log(createdMovie)
			res.redirect(`movies/${createdMovie._id}`);
		})
        .catch(err => res.render('moviesFolder'))
});


router.get('/movies', (req, res, next) => {
    Movie.find().populate('cast')
	.then(moviesFromDB => {
                 res.render('moviesFolder', { moviesList: moviesFromDB });
                })
                .catch(err => {
                    next(err);
                })
})


router.get('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id).populate('cast')
		.then(movieFromDB => {
			//console.log(movieFromDB);
			
			res.render('moviesFolder/show', { movie: movieFromDB });
		})
		.catch(err => {
			next(err);
		})
})

router.get('/movies/:id/edit', (req, res, next) => {
    const movieId = req.params.id;
    Movie.findById(movieId)
    .then(movies => {
        res.render('moviesFolder/edit', { movies: movies });
    })
    .catch(err => {
        next(err);
    })
});

router.post('/movies/:id/edit', (req, res, next) => {
    const movieId = req.params.id;
    const {title, genre, plot, cast} = req.body;
    Movie.findByIdAndUpdate(movieId, {
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    }, { new: true })  
    .then((updatedMovie) => {
        res.redirect(`/movies/${updatedMovie._id}`);
    })
    .catch(err => {
        next(err);
    })
});



module.exports = router;