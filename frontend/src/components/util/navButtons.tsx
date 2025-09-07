import { Link } from "react-router-dom";

interface NavProps {
  gameCount: string[],
  fetchRecords: (value: number) => Promise<void>
}

export default function NavButtons({ gameCount, fetchRecords }: NavProps) {
  return (
    <div className="w-fit justify-self-end-safe space-x-2">
      <Link to='/' className="bg-gray-400">
        Back
      </Link>
      <button className="bg-gray-400" onClick={() => fetchRecords(0)}>
        All
      </button>
      {gameCount.map((game) => (
        <button className="bg-gray-400" onClick={() => fetchRecords(Number(game.charAt(5)))}>
          {game}
        </button>
      ))}
    </div>
  )
}