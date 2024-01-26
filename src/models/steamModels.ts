export interface SteamResponse<T> {
  response: T;
}

export interface OwnedSteamGames {
  game_count: number;
  games: SteamGame[];
}

export interface SteamGame {
  appid: number;
  name: string;
  playtime_disconnected: number;
  playtime_forever: number;
  playtime_linux_forever: number;
  playtime_mac_forever: number;
  playtime_windows_forever: number;
  rtime_last_played: number;
}

export interface SteamWishlistedGame {
  name: string;
  capsule: string;
  review_score: number;
  review_desc: string;
  reviews_total: string;
  reviews_percent: number;
  release_date: number;
  release_string: string;
  platform_icons: string;
  subs: SteamWishlistedGameSub[];
  type: string;
  screenshots: string[];
  review_css: string;
  priority: number;
  added: number;
  background: string;
  rank: number;
  tags: string[];
  is_free_game: boolean;
  deck_compat: string;
  win: number;
}

interface SteamWishlistedGameSub {
  packageid: number;
  bundleid?: number;
  discount_block: string;
  discount_pct?: string;
  price: string;
}

export const getLastPlayed = (game: SteamGame): string => {
  const d = new Date(game.rtime_last_played * 1000);
  //return d.toJSON(); //This will return -->> 2023-10-11T20:05:00.000Z
  return d.toLocaleDateString(); //This will return -->> 10/24/2023
};
