const express = require('express');
let axios = require('axios');
var app = express();

app.post('/', function(req, res, next) {
  try {
    let results = req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch {
    next(err);
  }
});

app.listen(3000);


/////////////////////////////
//Corrected version
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/', async function(req, res, next) {
  try {
    const results = await Promise.all(req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    }));
    const out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.json(out);
  } catch(err) {
    next(err);
  }
});

app.listen(3000);