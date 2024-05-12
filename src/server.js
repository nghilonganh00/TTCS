'use strict';

var _express = _interopRequireDefault(require('express'));
var _cors = _interopRequireDefault(require('cors'));
var _bodyParser = _interopRequireDefault(require('body-parser'));
var _viewEngine = _interopRequireDefault(require('./config/viewEngine'));
var _web = _interopRequireDefault(require('./route'));
// var _connectDB = _interopRequireDefault(require("./config/connectDB"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
require('dotenv').config();
var app = (0, _express['default'])();
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x_authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(
  _bodyParser['default'].json({
    limit: '10mb',
  }),
);
app.use(
  _bodyParser['default'].urlencoded({
    extended: true,
  }),
);
(0, _viewEngine['default'])(app);
(0, _web['default'])(app);
// (0, _connectDB["default"])();
var port = process.env.PORT || 6969;
app.listen(port, function () {
  console.log('Backend Nodejs is running on the port:' + port);
});
