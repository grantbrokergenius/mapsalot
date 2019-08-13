import {
  GraphQLList, GraphQLBoolean, GraphQLString,
} from 'graphql';

import { GraphQLInt } from 'graphql/type';
import EventType from './types';
import Event from './event';

const queries = {
  list: {
    type: GraphQLList(EventType),
    args: {
      limit: { type: GraphQLInt },
      offset: { type: GraphQLInt },
      order: { type: GraphQLString },
    },
    resolve: async (v, { limit, offset, order }) => Event.findAll(limit, offset, order),
  },
  find: {
    type: GraphQLList(EventType),
    args: {
      limit: { type: GraphQLInt },
      offset: { type: GraphQLInt },
      order: { type: GraphQLString },
      event_name: { type: GraphQLString },
      venue_name: { type: GraphQLString },

    },
    resolve: async (v, {
      // eslint-disable-next-line camelcase
      limit, offset, order, event_name, venue_name,
    }) => Event.findSome({ event_name, venue_name }, limit, offset, order),
  },
};

const mutations = {
  map: {
    type: GraphQLBoolean,
    args: {
      bg_event_id: { type: GraphQLInt },
      stubhub_event_id: { type: GraphQLInt },
    },
  },
};

export { queries, mutations };
