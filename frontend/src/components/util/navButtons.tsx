import { Link } from "react-router-dom";

interface NavProps {
  gameCount: string[],
  match: number,
  viewMatch: (value: number) => void
}

export default function NavButtons({ gameCount, match, viewMatch }: NavProps) {
  return (
    <div className="w-full max-w-md justify-self-end-safe grid grid-cols-4 gap-2">
      <Link to='/' className="px-2 py-1 w-10 rounded-sm">
        Back
      </Link>
      <button className={`px-2 py-1 w-full rounded-sm ${match === 0 ? 'bg-primary text-primary-foreground' : ''}`} onClick={() => viewMatch(0)}>
        All
      </button>
      {gameCount.map((game) => (
        <button className={`px-2 py-1 w-full rounded-sm ${match === Number(game.charAt(5)) ? 'bg-primary text-primary-foreground' : ''}`} onClick={() => viewMatch(Number(game.charAt(5)))}>
          {game}
        </button>
      ))}
    </div>
  )
}