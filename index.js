import express from 'express'
import axios from 'axios'
import csvtojson from 'csvtojson'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000
const sheetCsvUrl = process.env.SHEET_CSV_URL

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(sheetCsvUrl)
    const json = await csvtojson().fromString(response.data)
    res.json(json)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar dados da planilha.' })
  }
})

app.listen(port, '0.0.0.0', () => {
  console.log(`API rodando em http://localhost:${port}`)
})