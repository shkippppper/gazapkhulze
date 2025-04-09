import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL || '', { ssl: 'require' })

async function seed() {
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS rsvps (
      id SERIAL PRIMARY KEY,
      coming VARCHAR(10) NOT NULL,
      food VARCHAR(255),
      drink VARCHAR(255),
      music VARCHAR(255),
      extra TEXT,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `
    console.log(`Created "rsvps" table`)

    // Add one example RSVP
    const example = await sql`
    INSERT INTO rsvps (coming, food, drink, music, extra)
    VALUES ('Yes', 'Vegetarian', 'Wine', 'Rock', 'Looking forward to it!')
    ON CONFLICT DO NOTHING
    RETURNING *;
  `

    console.log(`Seeded example RSVP`)

    return { createTable, example }
}

export default defineEventHandler(async (event) => {
    const startTime = Date.now()

    try {
        const rsvps = await sql`SELECT * FROM rsvps`
        const duration = Date.now() - startTime
        return { rsvps, duration }
    } catch (error) {
        if (
            error instanceof Error &&
            error && error.message === 'relation "rsvps" does not exist'
        ) {
            console.log('Table does not exist, creating and seeding it with example data now...')
            // Table is not created yet
            await seed()
            const rsvps = await sql`SELECT * FROM rsvps`
            const duration = Date.now() - startTime
            return { rsvps, duration }
        } else {
            throw error
        }
    }
})