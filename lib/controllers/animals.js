const { Router } = require('express');
const { Animal } = require('../models/Animal.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const data = await Animal.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Animal.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Animal.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });