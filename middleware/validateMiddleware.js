// validationMiddleware.js
const authSchema = require('../model/authSchema');

const validationMiddleware = async (req, res, next) => {
  try {
    await authSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = validationMiddleware;
