const { Router } = require('express');
const { City } = require('../models/City.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await City.getById(req.params.id);
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
      const data = await City.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await City.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
