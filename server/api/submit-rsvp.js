import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL || '', { ssl: 'require' })

// Make sure to create the table if it doesn't exist
async function ensureTableExists() {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        coming VARCHAR(50) NOT NULL,
        food VARCHAR(255),
        drink VARCHAR(255),
        music VARCHAR(255),
        extra TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `
        console.log('Ensured rsvps table exists')
        return true
    } catch (error) {
        console.error('Error creating table:', error)
        return false
    }
}

export default defineEventHandler(async (event) => {
    try {
        // First ensure the table exists
        const tableReady = await ensureTableExists()
        if (!tableReady) {
            return { success: false, error: 'Could not create database table' }
        }

        // Read request body
        const body = await readBody(event)
        const { coming, food, drink, music, extra } = body

        // Validate that required fields are present
        if (!coming) {
            return { success: false, error: 'Please indicate if you are coming' }
        }

        // Insert the new RSVP
                const result = await sql`
              INSERT INTO rsvps (name, surname, coming, food, drink, music, extra)
              VALUES (${name || null}, ${surname || null}, ${coming}, ${food || null}, ${drink || null}, ${music || null}, ${extra || null})
              RETURNING id
        `

        if (result && result.length > 0) {
            return {
                success: true,
                id: result[0].id
            }
        } else {
            return {
                success: false,
                error: 'Failed to insert RSVP'
            }
        }
    } catch (error) {
        console.error('Error submitting RSVP:', error)
        return {
            success: false,
            error: 'Failed to submit RSVP'
        }
    }
})