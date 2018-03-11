import {request} from 'graphql-request';

const URL = 'http://localhost:4000/graphql';

/**
 * Builds our request actions object to get data from graphql.
 */
const requestActions = {
    getBand: (id) => {
        const query = `{
            getBand(id: ${id}) {
                name
                favoriteSong
                description
            }
          }`;

        return request(URL, query);
    },
    getLandingpageDetails: (id) => {
        const query = `{
            getAllBands {
                id
                name
                description
                stars
            }
            
            getUser(id: ${id}) {
                name
            }
        }`;

        return request(URL, query);
    },
    editUserName: (id, name) => {
        const mutation = `mutation {
            editUserName(id: 1, name: "${name}") {
                name
            }
          }`;

        return request(URL, mutation);
    },
    addBand: (input) => {
        const mutation = `mutation {
            addBand(input: {
                name: "${input.name}",
                favoriteSong: "${input.favoriteSong}",
                description: "${input.description}",
                stars: ${input.stars}
            }) {
                id
                name
                description
                stars
            }
        }`;

        return request(URL, mutation);
    }
}

module.exports = requestActions;