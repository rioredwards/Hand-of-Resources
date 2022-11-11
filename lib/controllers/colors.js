const { Router } = require('express');
const { Color } = require('../models/Color.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Color.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Color.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
