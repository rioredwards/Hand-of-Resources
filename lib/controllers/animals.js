const { Router } = require('express');
const { Animal } = require('../models/Animal.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Animal.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
