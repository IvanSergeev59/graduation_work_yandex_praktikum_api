const routerUser = require('express').Router();

const {
  getUsers, getUsersId,
} = require('../controllers/users');
const olo = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');

  next();
};

routerUser.get('/', getUsers);
routerUser.get('/me', olo, getUsersId);
module.exports = routerUser;
