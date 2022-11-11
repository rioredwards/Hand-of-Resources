const { Router } = require('express');
const { User } = require('../models/User.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await User.getById(req.params.id);
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
      const data = await User.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
