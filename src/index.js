const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/typeDef');
const { resolvers } = require('./schema/resolvers');
const Port = 3000;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(Port, () => {
    console.log(`Server is running......${Port}`);
});
