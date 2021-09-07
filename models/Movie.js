const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = new Schema({
	title: String,
	genre: String,
	plot: String,
    cast: [{
		type: Schema.Types.ObjectId,
		ref: 'Celebrity' // here we put the reference to the ID we need to get, not nessecerily the ID related to this Schema
	}],
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;