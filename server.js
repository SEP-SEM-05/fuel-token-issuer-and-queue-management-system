const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();
const dbURI = process.env.DB_URI;

//express app
const appMaker = require('./app');
const app = appMaker.makeApp();

const port = process.env.PORT || 5000;

// connect to mongodb and listen
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => app.listen(port, () => {
		console.log(`Running on port ${port}`);
	}))
	.catch(err => console.log(err));