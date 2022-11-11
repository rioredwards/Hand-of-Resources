const { Router } = require('express');
const { App } = require('../models/App.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await App.getById(req.params.id);
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
      const data = await App.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
