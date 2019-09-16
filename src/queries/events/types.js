import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLInt } from 'graphql/type';

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: {
    bgEventId: {
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
    posName: {
      type: GraphQLString,
    },
  },
});

export default EventType;
