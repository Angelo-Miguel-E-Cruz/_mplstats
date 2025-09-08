import { Request, Response } from 'express'
import createSupaClient from '../supabase/supabase'

const supabase = createSupaClient()

export async function getMatch(req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("matches")
      .select('id, team_one, team_two')

    if (error) {
      throw error
    }

    return res.status(200).json({ matches: data })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return res.status(400).json({ error: errorMessage })
  }
}

export async function getMatchRecords(req: Request, res: Response) {
  try {

    const { matchId, gameId } = req.params
    var query = supabase
      .from("player_records_with_match")
      .select('*')
      .eq('match_id', matchId)

    if (gameId !== "0") {
      query = query
        .eq('game_num', `Game ${gameId}`)
    }

    query = query
      .order('shorthand', { ascending: true })
      .order('position', { ascending: false })

    const { data, error } = await query

    if (error) {
      throw error
    }

    query = supabase
      .from('games_with_team')
      .select('*')

    if (gameId !== "0") {
      query = query
        .eq('game_num', `Game ${gameId}`)
    }

    const { data: killData, error: killError } = await query

    if (killError)
      throw error

    return res.status(200).json({ records: data, kills: killData })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return res.status(400).json({ error: error })
  }
}

export async function getMatchCount(req: Request, res: Response) {
  try {
    const matchId = req.params.matchId
    const { data, error } = await supabase
      .from("match_with_game_records")
      .select('game_num')
      .eq('id', matchId)

    if (error) {
      throw error
    }

    return res.status(200).json({ matches: data })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return res.status(400).json({ error: errorMessage })
  }
}
