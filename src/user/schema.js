import {
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import login from './login';
import info from './info';

const queries = {
  login: {
    type: GraphQLBoolean,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve:
      async (v, { email, password }, ctx) => login(email, password)
        .then((session) => {
          if (!session) {
            return false;
          }

          ctx.session.session = session;
          return info(session).then((user) => {
            ctx.session.user = user;
            return true;
          });
        }),
  },
};

export default { queries };
