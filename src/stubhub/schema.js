import {
  GraphQLList, GraphQLString,
} from 'graphql';

import { GraphQLInt } from 'graphql/type';
import StubHubEventType from './types';
import findEvents from './stubhub';

const queries = {
  findStubHubEvents: {
    type: GraphQLList(StubHubEventType),
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
    }) => findEvents({
      start: offset, rows: limit, venue: venue_name, name: event_name, sort: order,
    }).then((res) => res.json()),
  },
};

export default { queries };
