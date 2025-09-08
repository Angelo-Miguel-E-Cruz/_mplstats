import { Request, Response } from 'express'
import createSupaClient from '../supabase/supabase'

const supabase = createSupaClient()

export async function getPlayerInfo(req: Request, res: Response) {
  try {
    const team_name = req.params.teamName
    const { data: playerData, error } = await supabase
      .from('player_records_with_match')
      .select('name, kills, deaths, assists, gpm, dpm, dtpm, hero, position')
      .eq('shorthand', team_name)

    if (error) {
      throw error
    }

    return res.status(200).json({ players: playerData })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return res.status(400).json({ error: errorMessage })
  }
}