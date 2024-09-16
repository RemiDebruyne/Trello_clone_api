import 'dotenv/config'
import mysql from 'mysql2/promise'
export const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if(err){
        console.error('Erreur de connexion à la database', err)
    } else {
        console.log('Connecté à la database')
    }
})

