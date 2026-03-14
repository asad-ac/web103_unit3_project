import { pool } from "../config/database.js"

const getEvents = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM events ORDER BY eventDate ASC")
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId
    const results = await pool.query("SELECT * FROM events WHERE id = $1", [eventId])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  getEvents,
  getEventById
}
