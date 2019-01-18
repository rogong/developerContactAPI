const mongoose = require('mongoose');
const Categories = require('./routes/categories');
const Developers = require('./routes/developers');
const express = require('express');

const app = express();

mongoose.connect('mongodb://localhost/developer')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connet to MongoDB.'));

app.use(express.json());
app.use('/api/developers', Developers);
app.use('/api/categories', Categories);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));