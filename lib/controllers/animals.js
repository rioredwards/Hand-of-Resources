const { Router } = require('express');
const { Animal } = require('../models/Animal.js');

module.exports = Router()
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
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Animal.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      console.log(req.params.id, req.body);
      const data = await Animal.updateById(req.params.id, req.body);
      console.log('hello');
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
