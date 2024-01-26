import axios from 'axios';
import {
  SteamResponse,
  OwnedSteamGames,
  SteamGame,
  SteamWishlistedGame,
} from '../models/steamModels';

const apiClient = axios.create({
  baseURL: 'https://api.steampowered.com',
});
const storeClient = axios.create({
  baseURL: 'https://store.steampowered.com',
});

const api_key = 'ENTER ONE HERE';
const steam_id = 'ENTER ONE HERE';

export const getOwnedGames = async (): Promise<SteamGame[]> => {
  try {
    const res = await apiClient.get('/IPlayerService/GetOwnedGames/v0001/', {
      params: {
        key: api_key,
        steamid: steam_id,
        include_appinfo: true,
        format: 'json',
      },
    });
    const results = res.data as SteamResponse<OwnedSteamGames>;

    if (results?.response?.game_count <= 0) {
      return [];
    }

    return results.response.games;
  } catch (error) {
    console.warn('[Steam API][getOwnedGames]' + error);
    throw error;
  }
};

export const getWishlist = async (): Promise<
  Map<number, SteamWishlistedGame>
> => {
  try {
    const res = await storeClient.get(
      `/wishlist/profiles/${steam_id}/wishlistdata`,
    );
    const m = new Map<number, SteamWishlistedGame>();
    for (const [k, v] of Object.entries(res.data)) {
      m.set(parseInt(k, 10), v as SteamWishlistedGame);
    }
    return m;
  } catch (error) {
    console.warn('[Steam API][getWishlist]' + error);
    throw error;
  }
};
