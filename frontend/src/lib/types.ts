// Record Types
export type MatchRecords = {
  id: string,
  name: string,
  kills: number,
  deaths: number,
  assists: number,
  gpm: number,
  dpm: number,
  dtpm: number,
  hero: string,
  position: string,
  shorthand: string,
  match_num: string
}

export type MatchAverage = {
  name: string,
  kills: number,
  deaths: number,
  assists: number,
  gpm: number,
  dpm: number,
  dtpm: number,
  heroes: string[],
  shorthand: string,
}

export type Game = {
  game_num: string
}

export type KillData = {
  game_id: string,
  blue: string,
  blue_kills: number,
  blue_team_id: string,
  red: string,
  red_kills: number,
  red_team_id: string,
  winner: string,
  match_time: string
}

// Team Types
export type TeamInfo = {
  id: string,
  team_name: string,
  shorthand: string,
  match_wins: number,
  match_losses: number,
  game_wins: number,
  game_losses: number,
}

export type PlayerInfo = {
  name: string,
  hero: string,
  position: string,
  kills: number,
  deaths: number,
  assists: number,
  gpm: number,
  dpm: number,
  dtpm: number
}

export type PlayerStats = {
  name: string,
  position: string,
  heroStats: HeroInfo[]
}

export type HeroInfo = {
  hero: string,
  kills: number,
  deaths: number,
  assists: number,
  gpm: number,
  dpm: number,
  dtpm: number,
  used?: number
}