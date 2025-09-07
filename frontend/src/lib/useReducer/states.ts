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