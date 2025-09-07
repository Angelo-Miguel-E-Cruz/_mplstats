import type { MatchAverage, MatchRecords } from "../types"

// Record States
export type RecordState = {
  gameCount: string[],
  records: MatchRecords[] | MatchAverage[],
  recordType: 'individual' | 'average'
}

export const initialRecord: RecordState = {
  gameCount: [],
  records: [],
  recordType: 'average'
}

export type RecordActions =
  | { type: 'SET_ARRAY', payload: { array: keyof RecordState, value: string[] | MatchRecords[] | MatchAverage[] } }
  | { type: 'SET_RECORD_TYPE', payload: 'individual' | 'average' }