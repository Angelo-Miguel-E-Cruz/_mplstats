import express from 'express'
import cors from 'cors'
import { getAll } from './routes/players'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/players', getAll)

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})