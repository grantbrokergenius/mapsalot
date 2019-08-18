import 'dotenv/config';

import express from 'express';
import session from 'express-session';
import graphqlHTTP from 'express-graphql';

import schema from './schema';

const sess = {
  secret: 'keyboard cat',
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

const app = express();

app.use(session(sess));

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.use(express.static('static'));

app.listen(4000);
