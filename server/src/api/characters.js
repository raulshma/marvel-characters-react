const express = require('express');
const testData = require('./testData');
const CryptoJS = require('crypto-js');
const axios = require('axios');

const apiKey = process.env.API_KEY;
const privKey = process.env.PRIVATE_KEY;
const timestamp = new Date().getTime();
const hash = CryptoJS.MD5(timestamp + privKey + apiKey).toString();

const http = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
});

const cache = new Map();

const router = express.Router();

router.get('/', async (req, res, next) => {
  let { offset } = req.query;
  if (!offset) offset = 0;
  const key = `characters${offset}`;
  if (cache.has(key)) {
    const { data, timestamp } = cache.get(key);
    const expiresIn = Date.now() - timestamp;
    if (expiresIn < 86400000) {
      console.log('Cache Hit');
      res.json(data);
      return;
    }
  }
  try {
    http
      .get(`characters`, {
        params: { apikey: apiKey, hash, ts: timestamp, offset },
      })
      .then((r) => {
        cache.set(key, { data: r.data, timestamp });
        res.json(r.data);
      })
      .catch((e) => {
        res.statusCode = 500;
        next(new Error(e.response.data.message));
      });
  } catch (e) {
    res.statusCode = 422;
    next(e);
  }
});
router.get('/test', async (req, res, next) => {
  return res.json(testData);
});

module.exports = router;
