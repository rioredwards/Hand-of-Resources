const { Router } = require('express');
const { App } = require('../models/App.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await App.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
