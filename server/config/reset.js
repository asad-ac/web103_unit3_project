import "./dotenv.js"
import { pool } from "./database.js"
import locationData from "../data/locations.js"
import eventData from "../data/events.js"

async function createLocationsTable() {
    const createTableQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(50) NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL
    );`

    try {
        await pool.query(createTableQuery)
        console.log("🎉 locations table created successfully")
    }
    catch (err) {
        console.error("⚠️ error creating locations table", err)
    }
}

async function createEventsTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        eventDate DATE NOT NULL,
        locationId INT NOT NULL REFERENCES locations(id),
        ticketLink TEXT NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL
    );`

    try {
        await pool.query(createTableQuery)
        console.log("🎉 events table created successfully")
    }
    catch (err) {
        console.error("⚠️ error creating events table", err)
    }
}

const seedLocationsTable = async () => {
    await createLocationsTable()

    for (const location of locationData) {
        try {
            const insertQuery = {
                text: "INSERT INTO locations (id, name, city, state, image, description) VALUES ($1, $2, $3, $4, $5, $6)"
            }

            const values = [
                location.id,
                location.name,
                location.city,
                location.state,
                location.image,
                location.description
            ]

            await pool.query(insertQuery, values)
            console.log(`✅ ${location.name} added successfully`)
        }
        catch (err) {
            console.error("⚠️ error inserting location", err)
        }
    }
}

const seedEventsTable = async () => {
    await createEventsTable()

    for (const event of eventData) {
        try {
            const insertQuery = {
                text: "INSERT INTO events (id, title, artist, eventDate, locationId, ticketLink, image, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
            }

            const values = [
                event.id,
                event.title,
                event.artist,
                event.eventDate,
                event.locationId,
                event.ticketLink,
                event.image,
                event.description
            ]

            await pool.query(insertQuery, values)
            console.log(`✅ ${event.title} added successfully`)
        }
        catch (err) {
            console.error("⚠️ error inserting event", err)
        }
    }
}

const seedDatabase = async () => {
    try {
        await seedLocationsTable()
        await seedEventsTable()
        console.log("🎉 database seeded successfully")
    }
    catch (err) {
        console.error("⚠️ error seeding database", err)
    }
    finally {
        await pool.end()
    }
}

seedDatabase()
