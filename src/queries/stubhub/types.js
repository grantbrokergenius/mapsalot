import {
  GraphQLObjectType,
} from 'graphql';
import { GraphQLInt, GraphQLString } from 'graphql/type';

const StubHubEventType = new GraphQLObjectType({
  name: 'StubHubEvent',
  fields: {
    exchangeEventId: {
      type: GraphQLInt,
    },
    event: {
      type: GraphQLString,
    },
    venue: {
      type: GraphQLString,
    },
    eventDate: {
      type: GraphQLString,
    },
  },
});

export default StubHubEventType;
