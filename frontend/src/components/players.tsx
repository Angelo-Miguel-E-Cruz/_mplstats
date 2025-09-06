import { useState, useEffect } from 'react'

type Players = {
  id: string,
  name: string,
  team: string,
  position: string
}

const loadPlayers = async () => {
  try {
    const response = await fetch('http://localhost:3000/players')
    const data = await response.json()

    if (!response.ok)
      throw new Error(data.error)

    return data
  } catch (error) {
    return error
  }
}

export default function Players() {
  const [players, setPlayers] = useState<Players[]>([])

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const data = await loadPlayers()
        if (data)
          setPlayers(data.players)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPlayers()
  }, [])

  return (
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          {player.name} {player.position} {player.team}
        </li>
      ))}
    </ul>
  )
}