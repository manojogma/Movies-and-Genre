const mongoose = require('mongoose');
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlemgth: 50
    },
    isGold: {
        type: Boolean,
        default:false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlemgth: 50
      },
});

const Customer = mongoose.model('Customer', customerSchema);

  //Validation
  function validateCustomer(customer) {
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean()
    });
    return schema.validate(customer);
  }

  module.exports.Customer = Customer;
  module.exports.validate = validateCustomer;