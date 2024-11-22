const mongoose = require('mongoose');
const express = require("express");
const app = express();
const genres = require('./routes/genres');

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected to mongodb...'))
.catch(err => console.error('Could not connect to mongodb...'));

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
