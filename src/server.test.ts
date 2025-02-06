import request from 'supertest'
import { Server } from './server'
import { HttpCode } from './core/constants'

describe('Server', () => {
	let server: Server
	const port = 3000
	const apiPrefix = '/api'

	beforeAll(async () => {
		server = new Server({ port, apiPrefix })
		await server.start()
	})

	it('should respond with a welcome message on GET /', async () => {
		const response = await request(`http://localhost:${port}`).get('/')
		expect(response.status).toBe(HttpCode.OK)
		expect(response.body.message).toBe(`Welcome to Initial API! \n Endpoints available at http://localhost:${port}/`)
	})

	it('should respond with 404 for unknown routes', async () => {
		const response = await request(`http://localhost:${port}`).get('/unknown-route')
		expect(response.status).toBe(HttpCode.NOT_FOUND)
	})
})
