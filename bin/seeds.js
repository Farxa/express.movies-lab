// 

const mongoose = require('mongoose');

const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/express-movies');

const celebrities = [
	{
		name: 'Keanu Reeves',
        occupation: 'Actor',
        catchPhrase: 'whoa',
        meme: 'https://c.tenor.com/nZ9IFupOViUAAAAC/keanu-reeves.gif'
	},
	{
		name: 'Sir Christopher Lee',
        occupation: 'Actor, author and singer',
        catchPhrase: 'So You Have Chosen ... Death.',
        meme: 'https://c.tenor.com/r4TTLd5-RxEAAAAC/lotr-so-you-have-chosen-death.gif'
	},
	{
		name: 'Sir Ian McKellen',
        occupation: 'Actor',
        catchPhrase: 'You shall not pass!',
        meme: 'https://c.tenor.com/uUnfd6BfpEgAAAAC/you-shall-not-pass.gif'
	}
]

Celebrity.create(celebrities)
.then(Celebrity => {
    console.log(celebrities);
    mongoose.connection.close();
})
.catch(err => {
    console.log(err);
})