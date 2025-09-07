import { API_URL } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type MatchWithGame = {
  id: string,
  team_one: string,
  team_two: string
}

export default function Match() {
  const nav = useNavigate()

  const handleMatchClick = (matchId: string) => {
    nav(`/records/${matchId}`);
  }

  const [matchInfo, setMatchInfo] = useState<MatchWithGame[]>([])

  async function fetchRecords() {
    try {

      const response = await fetch(`${API_URL}/matches`)
      const data = await response.json()

      if (!response.ok)
        throw new Error(data.error)

      setMatchInfo(data.matches)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [])


  return (
    <div className="flex flex-col gap-4 p-4">
      {matchInfo.map((match) => (
        <button key={match.id} className="bg-gray-500 p-4 w-fit" onClick={() => handleMatchClick(match.id)}>
          {match.team_one} vs {match.team_two}
        </button>
      ))}
    </div>
  )
}