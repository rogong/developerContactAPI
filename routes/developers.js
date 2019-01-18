const {Developer, validate} = require('../models/developer');
const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const developers = await Developer.find().sort('name');
  res.send(developers);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  let developer = new Developer ({ 
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    category: {
        _id: category._id,
        name: category.name
      }
   });
   developer = await developer.save();
   
   res.send(developer);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const developer = await Developer.findByIdAndUpdate(req.params.id,
     { name: req.body.name,
       phone: req.body.phone,
       address: req.body.address,
       category: {
        _id: category._id,
        name: category.name
      }
    },
     {new: true});

  if (!developer) return res.status(404).send('The developer with the given ID was not found.');
  res.send(developer);
});

router.delete('/:id', async (req, res) => {
  const developer = await Developer.findByIdAndRemove(req.params.id);

  if (!developer) return res.status(404).send('The developer with the given ID was not found.');

  res.send(developer);
});

router.get('/:id', async (req, res) => {
  const developer = await Developer.findById(req.params.id);

  if (!developer) return res.status(404).send('The developer with the given ID was not found.');
  res.send(developer);
});



module.exports = router;