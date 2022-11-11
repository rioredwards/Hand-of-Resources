const { Router } = require('express');
const { User } = require('../models/User.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await User.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
