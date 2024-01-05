const Joi = require('joi')

  const authSchema  = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    
    email: Joi.string()
    .email().lowercase().required(),

    password: Joi.string()
    .min(2)
    .required(),

  })
  module.exports = {
    authSchema
  }