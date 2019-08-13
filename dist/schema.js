"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphql = require("graphql");

var _schema = require("./events/schema");

var _default = new _graphql.GraphQLSchema({
  query: new _graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: { ..._schema.queries,
      hi: {
        type: _graphql.GraphQLString,
        args: {
          name: {
            type: _graphql.GraphQLString
          }
        },

        resolve(v, {
          name
        }) {
          return `world ${name}`;
        }

      },
      goodbye: {
        type: _graphql.GraphQLString,

        resolve() {
          return 'goodbye';
        }

      }
    }
  }),
  mutation: new _graphql.GraphQLObjectType({
    name: 'RootMutationType',
    fields: { ..._schema.mutations
    }
  })
});

exports.default = _default;