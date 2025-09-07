import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { MatchRecords, MatchAverage } from "@/lib/types"

interface CardProps {
  records: MatchRecords[] | MatchAverage[]
}

export default function CardStats({ records }: CardProps) {
  return (<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
    <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          Top KDA
        </CardTitle>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          Top Total Gold
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {Math.max(...records.map((p) => p.gpm)).toFixed(2)}k - {records.find((p) => p.gpm === Math.max(...records.map((p) => p.gpm)))?.name}
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          Top Damage Dealt per Minute
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {Math.max(...records.map((p) => p.dpm)).toFixed(2)}k - {records.find((p) => p.dpm === Math.max(...records.map((p) => p.dpm)))?.name}
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          Top Damage Taken per Minute
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {Math.max(...records.map((p) => p.dtpm)).toFixed(2)}k - {records.find((p) => p.dtpm === Math.max(...records.map((p) => p.dtpm)))?.name}
        </div>
      </CardContent>
    </Card>
  </div>
  )
}