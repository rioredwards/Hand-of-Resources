const { Router } = require('express');
const { City } = require('../models/City.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await City.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
