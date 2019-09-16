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
    resolve: async (v, { limit, offset, order }, ctx) => Event.find(ctx, { limit, offset, order }),
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
    }, ctx) => Event.find(ctx, {
      event_name,
      venue_name,
      date_from,
      date_to,
      limit,
      offset,
      order,
    }),
  },
};

const mutations = {
  map: {
    type: GraphQLBoolean,
    args: {
      bgEventId: { type: GraphQLInt },
      exchangeEventId: { type: GraphQLInt },
      exchangeId: { type: GraphQLInt },
    },
  },
  markUnresolved: {
    type: GraphQLBoolean,
    args: {
      bgEventId: { type: GraphQLInt },
    },
    resolve: async (
      v,
      { bgEventId, exchangeEventId, exchangeId },
      ctx,
    ) => Event.markUnresolved(ctx, bgEventId, exchangeEventId, exchangeId),
  },
};

export default { queries, mutations };
