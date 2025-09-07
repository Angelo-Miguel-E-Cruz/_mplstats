import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { roundOff } from "@/lib/functions"
import type { MatchRecords, MatchAverage, KillData } from "@/lib/types"

interface TableProps {
  recordType: 'individual' | 'average'
  records: MatchRecords[] | MatchAverage[]
  kills: KillData[]
}

export default function TableStats({ recordType, records, kills }: TableProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      {recordType === 'individual'
        ? <CardHeader className="grid grid-cols-3">
          <div className="flex gap-2">
            <h1 className={`${kills[0].winner === kills[0].blue ? 'text-green-700' : 'text-foreground'} font-bold`}>{kills[0].blue_kills}</h1>
            <h1>{kills[0].blue}</h1>
          </div>
          <div className="flex justify-center-safe gap-2 items-center">
            {kills[0].match_time}
          </div>
          <div className="flex justify-end-safe gap-2">
            <h1>{kills[0].red}</h1>
            <h1 className={`${kills[0].winner === kills[0].red ? 'text-green-700' : 'text-foreground'} font-bold`}>{kills[0].red_kills}</h1>
          </div>
        </CardHeader>
        : <></>
      }
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32"></TableHead>
              <TableHead className="w-32"></TableHead>
              <TableHead className="data-header">K</TableHead>
              <TableHead className="data-header">D</TableHead>
              <TableHead className="data-header">A</TableHead>
              <TableHead className="data-header">KDA</TableHead>
              <TableHead className="data-header">Total Gold</TableHead>
              <TableHead className="data-header">DDPM</TableHead>
              <TableHead className="data-header">DTPM</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={recordType === 'individual' ? (record as MatchRecords).id : `${record.name}-${record.kills}`}>
                <TableCell className="w-32">
                  <div className="flex flex-col justify-start">
                    <p className="player-name">{record.name}</p>
                    <p className="player-team">{record.shorthand}</p>
                  </div>
                </TableCell>
                <TableCell className="w-32">{recordType === 'individual'
                  ? (record as MatchRecords).hero
                  : (record as MatchAverage).heroes.map((hero) => (
                    <span>{hero}</span>
                  ))}</TableCell>
                <TableCell className="data-cell">
                  <div className="data">
                    {roundOff(record.kills)}
                  </div>
                </TableCell>
                <TableCell className="data-cell">
                  <div className="data">
                    {roundOff(record.deaths)}
                  </div>
                </TableCell>
                <TableCell className="data-cell">
                  <div className="data">
                    {roundOff(record.assists)}
                  </div>
                </TableCell>
                <TableCell className="data-cell">
                  <div className="data">
                    {roundOff((record.kills + record.assists) / (record.deaths === 0 ? 1 : record.deaths))}
                  </div>
                </TableCell>
                <TableCell className="data-cell">
                  <div className="data">
                    {roundOff(record.gpm)} k
                  </div>
                </TableCell>
                <TableCell className="data-cell">
                  <div className="data">
                    {roundOff(record.dpm)} k
                  </div>
                </TableCell>
                <TableCell className="data-cell">
                  <div className="data">
                    {roundOff(record.dtpm)} k
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card >
  )
}