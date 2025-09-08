import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import type { PlayerStats } from "@/lib/types"

interface TopPicksProps {
  playerHeroStats: PlayerStats[]
}

export default function TopPicks({ playerHeroStats }: TopPicksProps) {
  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {playerHeroStats.map((player) => (
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <span className="font-bold">{player.name} </span> <Badge variant='secondary'>{player.position}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="data-header"></TableHead>
                  <TableHead className="data-header">K</TableHead>
                  <TableHead className="data-header">D</TableHead>
                  <TableHead className="data-header">A</TableHead>
                  <TableHead className="data-header">Used</TableHead>
                  <TableHead className="data-header">Win Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {player.heroStats.map((hero) => (
                  <TableRow key={hero.hero}>
                    <TableCell className="data">{hero.hero}</TableCell>
                    <TableCell className="data">{hero.kills}</TableCell>
                    <TableCell className="data">{hero.deaths}</TableCell>
                    <TableCell className="data">{hero.assists}</TableCell>
                    <TableCell className="data">{hero.used}</TableCell>
                    <TableCell className="data">Win Rate</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}