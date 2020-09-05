const express = require('express');

const characters = require('./characters');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'MARVEL API PROXY - 👋🌎🌍🌏',
  });
});

router.use('/characters', characters);

module.exports = router;