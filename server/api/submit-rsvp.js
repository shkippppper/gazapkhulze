import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL || '', { ssl: 'require' })

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { coming, food, drink, music, extra } = body

        // Validate that required fields are present
        if (!coming) {
            return { success: false, error: 'Please indicate if you are coming' }
        }

        // Insert the new RSVP
        const result = await sql`
      INSERT INTO rsvps (coming, food, drink, music, extra)
      VALUES (${coming}, ${food || null}, ${drink || null}, ${music || null}, ${extra || null})
      RETURNING *
    `

        return {
            success: true,
            rsvp: result[0]
        }
    } catch (error) {
        console.error('Error submitting RSVP:', error)
        return {
            success: false,
            error: 'Failed to submit RSVP'
        }
    }
})