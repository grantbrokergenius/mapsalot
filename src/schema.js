import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
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
      hi: {
        type: GraphQLString,
        args: {
          name: { type: GraphQLString },
        },
        resolve(v, { name }) {
          return `hello ${name}`;
        },
      },
    },
  }),

  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      ...events.mutations,
    },
  }),
});
