import { API_URL } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Badge } from "../ui/badge"
import TopPicks from "../util/topPicks"
import type { PlayerStats, TeamInfo } from "@/lib/types"
import { combineRecords } from "@/lib/functions"
import { Card, CardContent } from "../ui/card"

type MatchHistory = {
  id: string,
  team_one: string,
  team_two: string,
  team_one_short: string,
  team_two_short: string,
  winner_one: string,
  winner_two: string,
  winner_three?: string
}

export default function TeamStats() {
  const nav = useNavigate()

  const handleMatchClick = (matchId: string) => {
    nav(`/records/${matchId}`);
  }
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
  const [matchHistory, setMatchHistory] = useState<MatchHistory[]>([])

  async function fetchInfo() {
    try {
      const response = await fetch(`${API_URL}/teams/${id}`)
      const data = await response.json()
      if (!response.ok)
        throw new Error(data.error)

      fetchMatch(data.team[0].shorthand)
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

  async function fetchMatch(teamName: string) {
    try {
      const response = await fetch(`${API_URL}/teams/${teamName}/matches`)
      const data = await response.json()
      if (!response.ok)
        throw new Error(data.error)

      setMatchHistory(data.history)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!id) return
    fetchInfo()
  }, [id])

  const getWins = (match: MatchHistory) => {
    var team_one_wins = 0
    var team_two_wins = 0

    const rounds = [match.winner_one, match.winner_two, match.winner_three]

    for (const winner of rounds) {
      if (!winner) continue
      if (winner === match.team_one) team_one_wins++
      else if (winner === match.team_two) team_two_wins++
    }

    return (
      <div className="space-x-2">
        <span className="font-semibold">{match.team_one_short}</span>
        <span className={`text-lg ${team_one_wins > team_two_wins ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}`}>{team_one_wins}</span>
        <span>-</span>
        <span className={`text-lg ${team_one_wins < team_two_wins ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}`}>{team_two_wins}</span>
        <span className="font-semibold">{match.team_two_short}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <h1>{teamInfo.team_name} ({teamInfo.shorthand})</h1>
        <Badge variant='secondary'>{teamInfo.match_wins} - {teamInfo.match_losses}</Badge>
        <Badge>{teamInfo.game_wins} - {teamInfo.game_losses}</Badge>
      </div>

      <div className="flex flex-col gap-2">
        <h2>Recent Matches</h2>
        <div className="grid grid-cols-5 gap-2">
          {matchHistory.map((match) => (
            <Card key={match.id} onClick={() => handleMatchClick(match.id)} className="cursor-pointer">
              <CardContent className="text-center">
                {getWins(match)}
              </CardContent>
            </Card>
          ))
          }
        </div>
      </div>

      <h1>Top Picks</h1>
      <TopPicks
        playerHeroStats={playerHeroStats} />

      <h1>Top Combos</h1>
    </div>
  )
}
