import type { MatchRecords, MatchAverage } from "./types"

export const averageStats = (records: MatchRecords[]): MatchAverage[] => {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return []
  }

  const grouped: Record<
    string,
    {
      heroes: Set<string>,
      kills: number[],
      deaths: number[],
      assists: number[],
      gpm: number[],
      dpm: number[],
      dtpm: number[],
      shorthand: string,
    }
  > = {}

  for (const { name, kills, deaths, assists, gpm, dpm, dtpm, hero, shorthand } of records) {
    if (!grouped[name]) {
      grouped[name] = {
        heroes: new Set(),
        kills: [],
        deaths: [],
        assists: [],
        gpm: [],
        dpm: [],
        dtpm: [],
        shorthand,
      }
    }
    grouped[name].heroes.add(hero)
    grouped[name].kills.push(kills)
    grouped[name].deaths.push(deaths)
    grouped[name].assists.push(assists)
    grouped[name].gpm.push(gpm)
    grouped[name].dpm.push(dpm)
    grouped[name].dtpm.push(dtpm)
  }

  return Object.entries(grouped).map(([name, data]) => ({
    name,
    kills: calculateAverage(data.kills),
    deaths: calculateAverage(data.deaths),
    assists: calculateAverage(data.assists),
    gpm: calculateAverage(data.gpm),
    dpm: calculateAverage(data.dpm),
    dtpm: calculateAverage(data.dtpm),
    heroes: Array.from(data.heroes),
    shorthand: data.shorthand,
  }))

}

export const calculateAverage = (values: number[]): number =>
  values.reduce((acc, val) => acc + val, 0) / values.length

export const roundOff = (value: number): number =>
  parseFloat(value.toFixed(2))
