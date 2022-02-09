const router = require("express").Router();
const { render } = require("../app");
const Celebrity = require("../models/Celebrity");
const Movie = require("../models/Movie");

router.get('/', (req, res, next) => {
    // we have to populate the cast
    // remove .populate and log the movies to see why
    // checkout https://mongoosejs.com/docs/populate.html#deep-populate
    // for more info on how to populate with nested objects
    Movie.find().populate('cast')
	.then(moviesFromDB => {
        console.log(moviesFromDB);
                 res.render('moviesFolder', { moviesList: moviesFromDB });
                })
                .catch(err => {
                    next(err);
                })
})



router.get('/new', (req, res, next) => {
    Celebrity.find()
		.then(celebsFromDB => {
			//console.log(celebsFromDB);
			res.render('moviesFolder/new.hbs', { celebs: celebsFromDB });
		})
        .catch(err => {
            next(err);
        })
})

router.post('/', (req, res, next) => {
	//console.log(req.body);
	const { title, genre, plot, cast } = req.body;
    console.log(cast);
	Movie.create({
		title: title,
		genre: genre,
		plot: plot,
		cast: cast
	})
		.then(() => {
			//console.log(createdMovie)
			res.redirect(`/movies`);
		})
        .catch(err => res.render('moviesFolder'))
});


router.get('/:id/edit', (req, res, next) => {
	Movie.findById(req.params.id).populate('cast')
    .then(movie => {
      console.log(movie);
      Celebrity.find().then(celebrities => {
        // console.log(movie.cast);
        let options = '';
        let selected = '';
        celebrities.forEach(celeb => {
          selected = movie.cast.map(actor => actor._id).includes(celeb._id) ? ' selected' : '';
          options += `<option value="${celeb._id}" ${selected}>${celeb.name}</option>`;
        });
        console.log(options);
        res.render('moviesFolder/edit', { movie, celebrities });
        // res.render('moviesFolder/edit', { movie, options });
      })
    })
    .catch(err => {
      next(err);
    })
});

router.post('/:id', (req, res, next) => {
    const movieId = req.params.id;
    const {title, genre, plot, cast} = req.body;
    Movie.findByIdAndUpdate(movieId, {
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    })  
    .then(() => {
        res.redirect(`/movies`);
    })
    .catch(err => {
        next(err);
    })
});



module.exports = router;