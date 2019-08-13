"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphql = require("graphql");

var _type = require("graphql/type");

const EventType = new _graphql.GraphQLObjectType({
  name: 'Event',
  fields: {
    bg_event_id: {
      type: _type.GraphQLInt
    },
    event_name: {
      type: _graphql.GraphQLString
    },
    venue_name: {
      type: _graphql.GraphQLString
    },
    event_date: {
      type: _graphql.GraphQLString
    },
    pos_name: {
      type: _graphql.GraphQLString
    }
  }
});
var _default = EventType;
exports.default = _default;