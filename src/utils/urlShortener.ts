import { encodeBase62, decodeBase62 } from './base62'
import pool from '../core/config/db'
import { FieldPacket, RowDataPacket, ResultSetHeader } from 'mysql2'
import { ZERO } from '../core/constants'

export async function shortenUrl(originalUrl: string): Promise<string> {
	const connection = await pool.getConnection()
	try {
		const [result]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
			'INSERT INTO Urls (originalurl) VALUES (?)',
			[originalUrl]
		)

		const insertedId = result.insertId
		const shortCode = encodeBase62(insertedId)

		await connection.execute('UPDATE Urls SET convertedurl = ? WHERE id = ?', [shortCode, insertedId])

		return `https://short.ly/${shortCode}`
	} finally {
		connection.release() // 커넥션 반환
	}
}

export async function getOriginalUrl(shortCode: string): Promise<string | null> {
	const connection = await pool.getConnection()
	try {
		const id = decodeBase62(shortCode) // Base62 디코딩 → 원래 ID 복원

		// ID를 기반으로 원본 URL 조회
		const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
			'SELECT originalurl FROM Urls WHERE id = ?',
			[id]
		)

		return rows.length > ZERO ? rows[ZERO].originalurl : null
	} catch (err) {
		console.error('Error while retrieving original URL:', err)
		throw err
	} finally {
		connection.release() // 커넥션 반환
	}
}
