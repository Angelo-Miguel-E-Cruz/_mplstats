import type { MatchRecords, MatchAverage, HeroInfo, PlayerInfo, PlayerStats } from "./types"

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

export const combineRecords = (records: PlayerInfo[]): PlayerStats[] => {

  const playerGroups = records.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = {
        name: curr.name,
        position: curr.position,
        records: [],
      }
    }
    const hero: HeroInfo = {
      hero: curr.hero,
      kills: curr.kills,
      deaths: curr.deaths,
      assists: curr.assists,
      gpm: curr.gpm,
      dpm: curr.dpm,
      dtpm: curr.dtpm
    }
    acc[curr.name].records.push(hero)
    return acc
  }, {} as Record<string, {
    name: string
    position: string
    records: HeroInfo[]
  }>)

  return Object.values(playerGroups).map(playerGroup => {
    const { name, position, records } = playerGroup

    const heroGroups = records.reduce((acc, record) => {
      if (!acc[record.hero]) {
        acc[record.hero] = []
      }
      acc[record.hero].push(record)
      return acc
    }, {} as Record<string, HeroInfo[]>)

    const heroStats: HeroInfo[] = Object.entries(heroGroups).map(([hero, heroRecords]) => {
      const recordCount = heroRecords.length

      return {
        hero,
        used: recordCount,
        kills: roundOff((heroRecords.reduce((sum, r) => sum + r.kills, 0) / recordCount)),
        deaths: roundOff((heroRecords.reduce((sum, r) => sum + r.deaths, 0) / recordCount)),
        assists: roundOff((heroRecords.reduce((sum, r) => sum + r.assists, 0) / recordCount)),
        dpm: roundOff((heroRecords.reduce((sum, r) => sum + r.dpm, 0) / recordCount)),
        dtpm: roundOff((heroRecords.reduce((sum, r) => sum + r.dtpm, 0) / recordCount)),
        gpm: roundOff((heroRecords.reduce((sum, r) => sum + r.gpm, 0) / recordCount)),
      }
    })

    return {
      name,
      position,
      heroStats
    }
  })
}