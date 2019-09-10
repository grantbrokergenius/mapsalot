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
      date_from: { type: GraphQLString },
      date_to: { type: GraphQLString },
    },
    resolve: async (v, {
      // eslint-disable-next-line camelcase
      limit, offset, order, event_name, venue_name, date_from, date_to,
    }) => Event.findSome({ event_name, venue_name, date_from, date_to }, limit, offset, order),
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
  markUnresolved: {
    type: GraphQLBoolean,
    args: {
      bg_event_id: { type: GraphQLInt },
    },
    resolve: async (v, { bg_event_id }) => Event.markUnresolved(bg_event_id),
  },
};

export default { queries, mutations };
