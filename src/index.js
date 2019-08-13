import 'dotenv/config';

import express from 'express';

import graphqlHTTP from 'express-graphql';

import schema from './schema';


const app = express();

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.use(express.static('static'));

app.listen(4000);
