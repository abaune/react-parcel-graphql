var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');
var fakeDatabase = require('./fakeDatabase');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input bandInput {
    name: String
    description: String
    favoriteSong: String
    stars: Int
  }

  type Band {
    id: Int!
    name: String
    favoriteSong: String
    description: String
    stars: Int
  }

  type User {
    id: Int
    name: String
  }

  type Query {
    getBand(id: Int!): Band
    getAllBands: [Band]
    getUser(id: Int!): User
  }

  type Mutation {
    editUserName(id: Int!, name: String!): User
    addBand(input: bandInput!): Band
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  getBand: ({id}) => {
    if (!fakeDatabase.bands[id]) {
      throw new Error('no message exists with id ' + id);
    }
    return fakeDatabase.bands[id];
  },
  getAllBands: () => {
    return Object.keys(fakeDatabase.bands).map(key => fakeDatabase.bands[key]);
  },
  getUser: ({id}) => {
    if (!fakeDatabase.users[id]) {
      throw new Error('no user exists with id ' + id);
    }
    return fakeDatabase.users[id];
  },
  editUserName: ({id, name}) => {
    if (!fakeDatabase.users[id]) {
      return new Error('no user exists with id ' + id)
    }
    fakeDatabase.users[id].name = name;
    return fakeDatabase.users[id];
  },
  addBand: ({input}) => {
    input.id = Object.keys(fakeDatabase.bands).length + 1;
    return fakeDatabase.bands[input.id] = input;
  },
};

// Start the express server using graphql.
var app = express();
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
