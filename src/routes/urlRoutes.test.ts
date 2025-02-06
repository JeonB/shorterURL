import request from 'supertest'
import express from 'express'
import urlRoutes from './urlRoutes'
import { HttpCode } from '../core/constants'
import { shortenUrl, getOriginalUrl } from '../utils/urlShortener'

jest.mock('../utils/urlShortener')

const app = express()
app.use(express.json())
app.use('/api/url', urlRoutes)

describe('URL Routes', () => {
	describe('POST /shorten', () => {
		it('should return 400 if originalUrl is not provided', async () => {
			const response = await request(app).post('/api/url/shorten').send({})
			expect(response.status).toBe(HttpCode.BAD_REQUEST)
			expect(response.body.error).toBe('URL is required')
		})

		it('should return shortUrl if originalUrl is provided', async () => {
			const mockShortUrl = 'http://short.url/abc123'
			;(shortenUrl as jest.Mock).mockResolvedValue(mockShortUrl)

			const response = await request(app).post('/api/url/shorten').send({ originalUrl: 'http://example.com' })
			expect(response.status).toBe(HttpCode.OK)
			expect(response.body.shortUrl).toBe(mockShortUrl)
		})

		it('should return 500 if there is an error shortening the URL', async () => {
			;(shortenUrl as jest.Mock).mockRejectedValue(new Error('Failed to shorten URL'))

			const response = await request(app).post('/api/url/shorten').send({ originalUrl: 'http://example.com' })
			expect(response.status).toBe(HttpCode.INTERNAL_SERVER_ERROR)
			expect(response.body.error).toBe('Failed to shorten URL')
		})
	})

	describe('GET /:shortCode', () => {
		it('should redirect to originalUrl if shortCode is valid', async () => {
			const mockOriginalUrl = 'http://example.com'
			;(getOriginalUrl as jest.Mock).mockResolvedValue(mockOriginalUrl)

			const response = await request(app).get('/api/url/abc123')
			expect(response.status).toBe(HttpCode.REDIRECT)
			expect(response.header.location).toBe(mockOriginalUrl)
		})

		it('should return 404 if shortCode is not found', async () => {
			;(getOriginalUrl as jest.Mock).mockResolvedValue(null)

			const response = await request(app).get('/api/url/abc123')
			expect(response.status).toBe(HttpCode.NOT_FOUND)
			expect(response.body.error).toBe('URL not found')
		})
	})
})
