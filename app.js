const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const superuserRoutes = require('./routes/superuserRoutes');
const officerRoutes = require('./routes/officerRoutes');
const ownerRoutes = require('./routes/ownerRoutes');

// environmental variables
require('dotenv').config();

// express app
const app = express();

app.use(cors());
app.use(express.json());


const dbURI = process.env.DB_URI;

// middleware & static files
app.use(express.urlencoded({ extended: true }));

// set static file path for productioin build
if (process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'));
}

// connect to mongodb and listen
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => app.listen(process.env.PORT || 5000, () => {
		console.log('listening to port 5000');
	}))
	.catch(err => console.log(err));

app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

app.use('/superuser', superuserRoutes);
app.use('/officer', officerRoutes);
app.use('/owner', ownerRoutes);