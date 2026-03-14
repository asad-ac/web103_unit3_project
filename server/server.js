import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import './config/dotenv.js'
import cors from 'cors'

// import the router from your routes file
import locations from './routes/locations.js'
import events from './routes/events.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')))
    app.use(express.static('public'))
}

app.get('/', (req, res) => {
    res.status(200).send('Virtual Community Space API is running')
})

// specify the api path for the server to use
app.use('/api/locations', locations)
app.use('/api/events', events)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
