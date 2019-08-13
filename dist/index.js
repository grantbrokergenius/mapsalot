"use strict";

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use('/graphql', (0, _expressGraphql.default)({
  schema: _schema.default,
  graphiql: true
}));
app.use(_express.default.static('static'));
app.listen(4000);