const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        age: Int!
        username: String!
        nationality: Nationality!
        friends: [User]
        favouriteMovie: [Movie]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    type Query {
        users: [User]
        user(id: ID!): User
        movies: [Movie]
        movie(name: String!): Movie
    }

    enum Nationality {
        CANADA
        BRAZIL
        CHILE
        INDIA
        GERMANY
    }
`;

module.exports = { typeDefs };
