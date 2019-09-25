const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema/index'); // return { typeDefs, resolvers }

const PORT = 3000;
const app = express();

const server = new ApolloServer(schema);
server.applyMiddleware({ app });

app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`));
