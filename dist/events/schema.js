"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutations = exports.queries = void 0;

var _graphql = require("graphql");

var _type = require("graphql/type");

var _types = _interopRequireDefault(require("./types"));

var _event = _interopRequireDefault(require("./event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queries = {
  list: {
    type: (0, _graphql.GraphQLList)(_types.default),
    args: {
      limit: {
        type: _type.GraphQLInt
      },
      offset: {
        type: _type.GraphQLInt
      },
      order: {
        type: _graphql.GraphQLString
      }
    },
    resolve: async (v, {
      limit,
      offset,
      order
    }) => _event.default.findAll(limit, offset, order)
  },
  find: {
    type: (0, _graphql.GraphQLList)(_types.default),
    args: {
      limit: {
        type: _type.GraphQLInt
      },
      offset: {
        type: _type.GraphQLInt
      },
      order: {
        type: _graphql.GraphQLString
      },
      event_name: {
        type: _graphql.GraphQLString
      },
      venue_name: {
        type: _graphql.GraphQLString
      }
    },
    resolve: async (v, {
      // eslint-disable-next-line camelcase
      limit,
      offset,
      order,
      event_name,
      venue_name
    }) => _event.default.findSome({
      event_name,
      venue_name
    }, limit, offset, order)
  }
};
exports.queries = queries;
const mutations = {
  map: {
    type: _graphql.GraphQLBoolean,
    args: {
      bg_event_id: {
        type: _type.GraphQLInt
      },
      stubhub_event_id: {
        type: _type.GraphQLInt
      }
    }
  }
};
exports.mutations = mutations;