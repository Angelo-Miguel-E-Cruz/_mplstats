import { Request, Response } from 'express'
import createSupaClient from '../supabase/supabase'

const supabase = createSupaClient()

export async function getTeamInfo(req: Request, res: Response) {
  try {
    const team_id = req.params.teamId
    const { data, error } = await supabase
      .from("team")
      .select('*')
      .eq('id', team_id)

    if (error) {
      throw error
    }

    return res.status(200).json({ team: data })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return res.status(400).json({ error: errorMessage })
  }
}

export async function getMatchHistory(req: Request, res: Response) {
  try {
    const team_name = req.params.teamName
    const { data, error } = await supabase
      .from("matches")
      .select('*')
      .or(`team_one_short.eq.${team_name},team_two_short.eq.${team_name}`)

    if (error) {
      throw error
    }

    return res.status(200).json({ history: data })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return res.status(400).json({ error: errorMessage })
  }
}
