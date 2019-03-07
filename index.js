const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const PORT = 3007;
const {
  getRecs,
  updateRec,
  postClick
} = require('./server/controllers/routes.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(express.static(__dirname + '/dist'));

app.get('/api/products/:id', (req, res) => {
  getRecs(req, res);
});

// app.post();

// app.update();

app.use('/:id', express.static(__dirname + '/dist'));
app.listen(PORT, console.log(`listening at port ${PORT}`));
