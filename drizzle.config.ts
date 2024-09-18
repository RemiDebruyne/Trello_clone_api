import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'mysql',
    schema: './src/db/schema.ts',
    out: './migrations',
    dbCredentials: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'trello_clone',
    },
    verbose: true,
    strict: true,
})