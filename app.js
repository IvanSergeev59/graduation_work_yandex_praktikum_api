require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { NODE_ENV, MONGO_DB } = process.env;
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./errors/errorHandler');
const router = require('./routes/index.js');
const mongoAd = require('./mongo/mongoAd');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8082');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, authorization,Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
}); 
app.use(helmet());
app.use(requestLogger); // подключаем логгер запросов
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : mongoAd, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/', router);

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);
app.use(errorLogger); // подключаем логгер ошибок
app.listen(PORT, () => {
  
});
