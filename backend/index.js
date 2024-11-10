const express = require('express');

require('dotenv').config();
const env = process.env;
const port = env.port;

const app = express();

app.get('/feedback', (req, res) => {
  res.json({text: 'Here is a feedback from the server'});
});

app.listen(port, () => {
  console.log(`Started listening at ${port}`);
})