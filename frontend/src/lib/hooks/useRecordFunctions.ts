import { useReducer } from "react"
import { averageStats } from "../functions"
import type { Game, MatchAverage, MatchRecords } from "../types"
import RecordsReducer from "../useReducer/recordsReducer"
import { initialRecord } from "../useReducer/states"
import { API_URL } from "../utils"

export function useRecordFunctions(id: string | undefined) {
  const [state, dispatch] = useReducer(RecordsReducer, initialRecord)

  async function fetchCount() {
    try {

      const response = await fetch(`${API_URL}/records/${id}`)
      const data = await response.json()
      if (!response.ok)
        throw new Error(data.error)

      const game: Game[] = data.matches
      const gameNumber: string[] = game.map(game => game.game_num)
      dispatch({ type: 'SET_PROPERTY', payload: { property: 'gameCount', value: gameNumber } })
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchRecords(matchnum: number) {
    try {

      const response = await fetch(`${API_URL}/records/${id}/${matchnum}`)
      const data = await response.json()

      if (!response.ok)
        throw new Error(data.error)

      const kills = data.kills
      var records: MatchRecords[] | MatchAverage[]

      if (matchnum === 0) {
        records = averageStats(data.records)
        dispatch({ type: 'SET_RECORD_TYPE', payload: 'average' })
      }
      else {
        records = data.records
        dispatch({ type: 'SET_RECORD_TYPE', payload: 'individual' })
      }
      dispatch({ type: 'SET_PROPERTY', payload: { property: 'records', value: records } })
      dispatch({ type: 'SET_PROPERTY', payload: { property: 'killData', value: kills } })
    } catch (error) {
      console.error(error)
    }
  }

  function viewMatch(matchnum: number) {
    dispatch({ type: 'SET_PROPERTY', payload: { property: 'viewMatch', value: matchnum } })
    fetchRecords(matchnum)
  }

  return { state, dispatch, fetchCount, viewMatch }
}
