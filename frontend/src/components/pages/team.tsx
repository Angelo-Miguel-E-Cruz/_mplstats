import { API_URL } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Badge } from "../ui/badge"
import TopPicks from "../util/topPicks"
import type { PlayerStats, TeamInfo } from "@/lib/types"
import { combineRecords } from "@/lib/functions"


export default function TeamStats() {
  const { id } = useParams()

  const [playerHeroStats, setPlayerHeroStats] = useState<PlayerStats[]>([])
  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    id: '',
    team_name: '',
    shorthand: '',
    match_wins: 0,
    match_losses: 0,
    game_wins: 0,
    game_losses: 0,
  })

  async function fetchInfo() {
    try {
      const response = await fetch(`${API_URL}/teams/${id}`)
      const data = await response.json()
      if (!response.ok)
        throw new Error(data.error)

      fetchPlayers(data.team[0].shorthand)
      setTeamInfo(data.team[0])
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchPlayers(teamName: string) {
    try {
      const response = await fetch(`${API_URL}/players/${teamName}`)
      const data = await response.json()
      if (!response.ok)
        throw new Error(data.error)

      setPlayerHeroStats(combineRecords(data.players))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!id) return
    fetchInfo()
  }, [id])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <h1>{teamInfo.team_name} ({teamInfo.shorthand})</h1>
        <Badge variant='secondary'>{teamInfo.match_wins} - {teamInfo.match_losses}</Badge>
        <Badge>{teamInfo.game_wins} - {teamInfo.game_losses}</Badge>
      </div>

      <div className="flex flex-col gap-2">
        <h2>Recent Matches</h2>
      </div>

      <h1>Top Picks</h1>
      <TopPicks
        playerHeroStats={playerHeroStats} />

      <h1>Top Combos</h1>
    </div>
  )
}
