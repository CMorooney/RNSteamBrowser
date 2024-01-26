import axios from 'axios';
import {
  RAWGListResponse,
  RAWGGameFromSearch,
  RAWGGame,
} from '../models/rawgModels';

const client = axios.create({
  baseURL: 'https://api.rawg.io/api',
});

const api_key = '';

export const getByQuery = async (
  query: string,
): Promise<RAWGGameFromSearch[]> => {
  try {
    const res = await client.get('/games', {
      params: {
        key: api_key,
        search: query,
      },
    });

    const searchResults = res.data as RAWGListResponse<RAWGGameFromSearch>;

    if (!searchResults?.count) {
      return [];
    }

    return searchResults.results;
  } catch (error) {
    console.warn('[RAWG API] ' + error);
    throw error;
  }
};

export const getBySlugOrId = async (
  slugOrId: string | number,
): Promise<RAWGGame> => {
  try {
    const res = await client.get(`/games/${slugOrId}`, {
      params: {key: api_key},
    });

    const searchResults = res.data as RAWGGame;

    if (searchResults == null) {
      throw new Error('game not found or error parsing data');
    }

    return searchResults;
  } catch (error) {
    console.warn('[RAWG API] ' + error);
    throw error;
  }
};
