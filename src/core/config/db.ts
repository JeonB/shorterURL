import { createConnection } from 'mysql2'

const connection = createConnection({
	host: 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	port: 3306,
	database: 'my_db'
})

export default connection
