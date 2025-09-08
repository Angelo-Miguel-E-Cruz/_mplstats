import express from 'express'
import cors from 'cors'
import * as matchFunctions from './routes/match'
import { getTeamInfo } from './routes/team'
import { getPlayerInfo } from './routes/players'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/matches', matchFunctions.getMatch)
app.get('/records/:matchId', matchFunctions.getMatchCount)
app.get('/records/:matchId/:gameId', matchFunctions.getMatchRecords)
app.get('/teams/:teamId', getTeamInfo)
app.get('/players/:teamName', getPlayerInfo)

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})