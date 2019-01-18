
const mongoose = require('mongoose');
const Joi = require('joi');
const { categorySchema } = require('./category');


// Define collection and schema for Course
const Developer = mongoose.model('Developers', new mongoose.Schema({
  
   name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength:50
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength:12
  },
  
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength:255
  },
  category: {
    type: categorySchema,
    required: true
  }

}));


function validate(developer) {
  const schema = {
      name: Joi.string().min(5).max(50).required(),
      categoryId: Joi.string().required(),
      phone: Joi.string().min(10).required(),
      address: Joi.string().min(5).required()
    };
  
    return Joi.validate(developer, schema);
  }


  exports.validate = validate;

exports.Developer = Developer;