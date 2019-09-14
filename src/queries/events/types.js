import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLInt } from 'graphql/type';

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: {
    bg_event_id: {
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
    pos_name: {
      type: GraphQLString,
    },
  },
});

export default EventType;
