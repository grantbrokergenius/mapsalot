import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import events from './queries/events/schema';
import stubhub from './queries/stubhub/schema';
import user from './queries/user/schema';

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
