import express from 'express';
import cors from 'cors';
import {CONFIG} from '../../env';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
});

const app = express();

app.use(cors({
  origin: '*'
}));

app.get('/characters', async (req, res) => {
  try {
    const result = await client.query({
      query: gql`
        query {
          characters(filter: { species: "Human" }) {
            results {
              name
              species
              status
              type
              gender
              origin{name}
              location {name}
              image
            }
          }
        }
      `
    });

    res.send(result.data?.characters.results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(CONFIG.apiPort, () => {
  console.log('Server running on port ' + CONFIG.apiPort);
});
