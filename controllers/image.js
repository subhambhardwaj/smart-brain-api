const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '0ec1bc5607eb47beb6563cb0a970541c'
});

const handleAPICall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => res.json(entries[0]))
	.catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	handleImage, handleAPICall
}