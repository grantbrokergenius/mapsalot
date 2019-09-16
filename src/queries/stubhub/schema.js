import {
  GraphQLList, GraphQLString,
} from 'graphql';

import { GraphQLInt } from 'graphql/type';
import StubHubEventType from './types';
import findEvents from './stubhub';

const combineDates = (dateFrom, dateTo) => [dateFrom, dateTo].join(' TO ');

const queries = {
  findStubHubEvents: {
    type: GraphQLList(StubHubEventType),
    args: {
      limit: { type: GraphQLInt },
      offset: { type: GraphQLInt },
      order: { type: GraphQLString },
      event_name: { type: GraphQLString },
      venue_name: { type: GraphQLString },
      dateFrom: { type: GraphQLString },
      dateTo: { type: GraphQLString },
    },
    resolve: async (v, {
      // eslint-disable-next-line camelcase
      limit, offset, order, event_name, venue_name, dateFrom, dateTo,
    }, ctx) => findEvents(ctx, {
      start: offset, rows: limit, venue: venue_name, name: event_name, sort: order, dateLocal: combineDates(dateFrom, dateTo),
    }),
  },
};

export default { queries };
