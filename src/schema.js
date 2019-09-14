import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import events from './events/schema';
import stubhub from './stubhub/schema';
import user from './user/schema';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...events.queries,
      ...stubhub.queries,
      ...user.queries,
    },
  }),

  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      ...events.mutations,
    },
  }),
});
