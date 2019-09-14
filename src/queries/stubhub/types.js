import {
  GraphQLObjectType,
} from 'graphql';
import { GraphQLInt, GraphQLString } from 'graphql/type';

const StubHubEventType = new GraphQLObjectType({
  name: 'StubHubEvent',
  fields: {
    stubhub_event_id: {
      type: GraphQLInt,
    },
    event_name: {
      type: GraphQLString,
    },
    venue_name: {
      type: GraphQLString,
    },
    event_date: {
      type: GraphQLString,
    },
  },
});

export default StubHubEventType;
