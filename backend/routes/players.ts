import { Request, Response } from 'express'
import createSupaClient from '../supabase/supabase'

const supabase = createSupaClient()

export async function getAll(req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("players")
      .select('*')

    if (error) {
      throw error
    }

    return res.status(200).json({ players: data })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return res.status(400).json({ error: errorMessage })
  }
}