const { gql } = require('apollo-server-express');
const resolvers = require('./resolvers');

const typeDefs = gql`
  type Project {
    id: Int!
    name: String!
    tasks: [Task]
  }
  type Task {
    id: Int!
    title: String!
    project: Project
    completed: Boolean!
  }
  type Query {
    projectByName(name: String!): Project
    fetchTasks: [Task]
    getTask(id: Int!): Task 
  }
  type Mutation {
    markAsCompleted(taskID: Int!): Task 
  }
`;

module.exports = { typeDefs, resolvers };
