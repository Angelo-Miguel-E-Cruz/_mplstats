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
  id: string,
  blue: string,
  blue_kills: number,
  red: string,
  red_kills: number,
  winner: string,
  match_time: string
}