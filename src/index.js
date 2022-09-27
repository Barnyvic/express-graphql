const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const shema = require('./shema/shema');
const database = require('./config/database');
const colors = require('colors');

const Port = process.env.PORT || 5050;

const app = express();
database();

app.use(
    '/graphql',
    graphqlHTTP({
        schema: shema,
        graphiql: true
    })
);

app.listen(Port, () => {
    console.log(`Server running on port ${Port}`.bgMagenta);
});
