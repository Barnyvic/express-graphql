const { UserList, MovieList } = require('../../fakedata');

const _ = require('lodash');

const resolvers = {
    Query: {
        users() {
            return UserList;
        },
        user(parent, args) {
            const id = args.id;
            const User = _.find(UserList, { id: Number(id) });
            return User;
        },
        movies() {
            return MovieList;
        },
        movie(parent, args) {
            const name = args.name;
            const movie = _.find(MovieList, { name: name });
            return movie;
        }
    },
    User: {
        favouriteMovie() {
            return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2008);
        }
    }
};

module.exports = { resolvers };
