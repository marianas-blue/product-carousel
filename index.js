require('newrelic');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const PORT = 80;
const {
  getRecs,
  updateRec,
  postClick
} = require('./server/controllers/routes.js');

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.get('/api/products/:id', (req, res) => {
  getRecs(req, res);
});

app.put('/api/products/:id', (req, res) => {
  updateRec(req, res);
});

app.post('/api/products/:id', (req, res) => {
  postClick(req, res);
});

app.use('/:id', express.static(__dirname + '/dist'));
app.listen(PORT, console.log(`listening at port ${PORT}`));
