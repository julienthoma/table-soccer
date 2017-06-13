const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port);
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

module.exports = app;
