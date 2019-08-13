import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { queries, mutations } from './events/schema';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...queries,
      hi: {
        type: GraphQLString,
        args: {
          name: { type: GraphQLString },
        },
        resolve(v, { name }) {
          return `world ${name}`;
        },
      },
      goodbye: {
        type: GraphQLString,
        resolve() {
          return 'goodbye';
        },
      },
    },
  }),

  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      ...mutations,
    },
  }),
});
