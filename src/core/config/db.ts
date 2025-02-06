import mysql from 'mysql2/promise'

const dbConfig = {
	host: 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	port: 3306,
	database: 'my_db',
	waitForConnections: true,
	connectionLimit: 10, // 커넥션 풀 최대 개수
	queueLimit: 0
}

const pool = mysql.createPool(dbConfig)

export default pool
