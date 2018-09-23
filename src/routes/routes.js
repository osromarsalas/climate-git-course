const express = require('express');
const router = express.Router();

const ForecastIo = require('forecastio');
const weather = new ForecastIo('4cd0fd0691b3b03e628d30958cd6f393');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/latitude/:latitude/longitude/:longitude', (req, res, next) => {
  if (!req.params.latitude || !req.params.longitude) {
    res.status(404).json({
      msj: 'error'
    });
  }

  const latitude = parseInt(req.params.latitude, 10);
  const longitude = parseInt(req.params.longitude, 10);

  weather.forecast(latitude, longitude, (error, data) => {
    if (error) {
      console.log('error');
      next();
      return;
    }
    const temperature = data.currently.temperature;
    const gradosCentigrados = (temperature - 32) * .5556;
    res.json({
      temperature: gradosCentigrados,
      timezone: data.timezone,
    });
  });
});

module.exports = router;
