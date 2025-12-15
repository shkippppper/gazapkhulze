import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL || '', { ssl: 'require' })

// Simple table creation - just create if not exists
async function ensureTableExists() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS rsvps (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                surname VARCHAR(255),
                coming VARCHAR(50) NOT NULL,
                food VARCHAR(255),
                drink VARCHAR(255),
                music VARCHAR(255),
                extra TEXT,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log('Table ensured to exist');
        return true;
    } catch (error) {
        console.error('Error creating table:', error);
        return false;
    }
}

export default defineEventHandler(async (event) => {
    try {
        console.log('API endpoint called');

        // Read request body first
        const body = await readBody(event);
        console.log('Request body:', body);

        const { name, surname, coming, food, drink, music, extra } = body;

        // Validate required field
        if (!coming) {
            return { success: false, error: 'Please indicate if you are coming' };
        }

        // Try to insert directly first - table might already exist
        try {
            const result = await sql`
                INSERT INTO rsvps (name, surname, coming, food, drink, music, extra)
                VALUES (${name || null}, ${surname || null}, ${coming}, ${food || null}, ${drink || null}, ${music || null}, ${extra || null})
                RETURNING id
            `;

            console.log('Insert successful:', result);
            return { success: true, id: result[0].id };

        } catch (insertError: any) {
            // If table doesn't exist, create it and retry
            if (insertError?.message?.includes('relation "rsvps" does not exist')) {
                console.log('Table does not exist, creating...');
                
                const tableCreated = await ensureTableExists();
                if (!tableCreated) {
                    return { success: false, error: 'Could not create database table' };
                }

                // Retry insert
                const result = await sql`
                    INSERT INTO rsvps (name, surname, coming, food, drink, music, extra)
                    VALUES (${name || null}, ${surname || null}, ${coming}, ${food || null}, ${drink || null}, ${music || null}, ${extra || null})
                    RETURNING id
                `;

                console.log('Insert successful after table creation:', result);
                return { success: true, id: result[0].id };
            }

            // If it's a column mismatch error, we need to alter or recreate the table
            if (insertError?.message?.includes('column') && insertError?.message?.includes('does not exist')) {
                console.log('Table schema mismatch, recreating table...');
                
                await sql`DROP TABLE IF EXISTS rsvps`;
                const tableCreated = await ensureTableExists();
                
                if (!tableCreated) {
                    return { success: false, error: 'Could not recreate database table' };
                }

                // Retry insert
                const result = await sql`
                    INSERT INTO rsvps (name, surname, coming, food, drink, music, extra)
                    VALUES (${name || null}, ${surname || null}, ${coming}, ${food || null}, ${drink || null}, ${music || null}, ${extra || null})
                    RETURNING id
                `;

                return { success: true, id: result[0].id };
            }

            // Unknown insert error
            console.error('Insert error:', insertError);
            return { success: false, error: `Database error: ${insertError.message}` };
        }

    } catch (error: any) {
        console.error('Unhandled error:', error);
        return { success: false, error: `Failed to submit RSVP: ${error.message || 'Unknown error'}` };
    }
});