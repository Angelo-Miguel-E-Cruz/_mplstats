import type { KillData, MatchAverage, MatchRecords } from "../types"

// Record States
export type RecordState = {
  gameCount: string[],
  records: MatchRecords[] | MatchAverage[],
  recordType: 'individual' | 'average',
  viewMatch: number,
  killData: KillData[]
}

export const initialRecord: RecordState = {
  gameCount: [],
  records: [],
  recordType: 'average',
  viewMatch: 0,
  killData: []
}

export type RecordActions =
  | { type: 'SET_PROPERTY', payload: { property: keyof RecordState, value: string[] | MatchRecords[] | MatchAverage[] | number | KillData[] } }
  | { type: 'SET_RECORD_TYPE', payload: 'individual' | 'average' }

// Team States
export type TeamRecord = {
  id: string,
  team_name: string,
  shorthand: string,
  match_wins: number,
  match_losses: number,
  game_wins: number,
  game_losses: number,
}

export type TeamState = {
  teamRecord: TeamRecord
}

export const initialTeam: TeamState = {
  teamRecord: {
    id: '',
    team_name: '',
    shorthand: '',
    match_wins: 0,
    match_losses: 0,
    game_wins: 0,
    game_losses: 0,
  }

}

export type TeamActions =
  | { type: 'SET_RECORD', payload: { property: keyof TeamRecord, value: string | number } }