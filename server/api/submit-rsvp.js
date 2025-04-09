import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL || '', { ssl: 'require' })

// Make sure to create the table if it doesn't exist
async function ensureTableExists() {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255),
        surname VARCHAR(255),
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
        console.log('API endpoint called');

        // First ensure the table exists
        console.log('Ensuring table exists...');
        const tableReady = await ensureTableExists();
        console.log('Table ready:', tableReady);

        if (!tableReady) {
            console.error('Could not create database table');
            return { success: false, error: 'Could not create database table' };
        }

        // Read request body
        console.log('Reading request body...');
        const body = await readBody(event);
        console.log('Request body received:', JSON.stringify(body, null, 2));

        const { name, surname, coming, food, drink, music, extra } = body;
        console.log('Destructured values:', { name, surname, coming, food, drink, music, extra });

        // Validate that required fields are present
        if (!coming) {
            console.error('Missing required field: coming');
            return { success: false, error: 'Please indicate if you are coming' };
        }

        // Insert the new RSVP
        console.log('Inserting RSVP into database...');
        try {
            const result = await sql`
        INSERT INTO rsvps (name, surname, coming, food, drink, music, extra)
        VALUES (${name || null}, ${surname || null}, ${coming}, ${food || null}, ${drink || null}, ${music || null}, ${extra || null})
        RETURNING id
      `;

            console.log('SQL result:', result);

            if (result && result.length > 0) {
                console.log('RSVP inserted successfully with ID:', result[0].id);
                return {
                    success: true,
                    id: result[0].id
                };
            } else {
                console.error('SQL query succeeded but returned no results');
                return {
                    success: false,
                    error: 'Failed to insert RSVP - no ID returned'
                };
            }
        } catch (sqlError) {
            console.error('SQL error:', sqlError);
            console.error('SQL error message:', sqlError.message);
            console.error('SQL error details:', JSON.stringify(sqlError, null, 2));
            return {
                success: false,
                error: `SQL Error: ${sqlError.message || 'Unknown SQL error'}`
            };
        }
    } catch (error) {
        console.error('Unhandled error in API endpoint:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        return {
            success: false,
            error: `Failed to submit RSVP: ${error.message || 'Unknown error'}`
        };
    }
});