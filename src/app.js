/*
  npm install
    * nodemon -> reset server
    * express
    * ejs -> html
    * morgan -> request
    * forecastio -> climar https://darksky.net/dev
*/
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

const routes = require('./routes/routes.js');

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));

// routes
app.use(routes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res, next) => {
  res.status(404).end('404 Page not found');
});

// start server
app.listen(app.get('port'), () => {
  console.log('Run server on port ', app.get('port'));
});
