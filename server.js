import express from 'express'
import {callAssistant} from './chat.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.static("public"));


app.use(express.json())

app.get('/api/test', async (req, res) => {
    const response = await callAssistant("why do parrots talk?")
    res.json({response})
})

app.post('/api/chat', async (req, res) => {
    const prompt = req.body?.prompt ?? "de user didnt do anything"
    const plants = req.body?.info
    const response = await callAssistant(prompt, plants)

    res.json({response})
})

app.listen(3000, () => console.log(`Server on http://localhost:3000`))

