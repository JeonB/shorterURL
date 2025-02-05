import express, { Request, Response } from 'express'
import compression from 'compression'
import rateLimit from 'express-rate-limit'

import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants'

interface ServerOptions {
	port: number
	apiPrefix: string
}

export class Server {
	private readonly app = express()
	private readonly port: number

	constructor(options: ServerOptions) {
		const { port } = options
		this.port = port
	}

	async start(): Promise<void> {
		//* Middlewares
		this.app.use(express.json()) // parse json in request body (allow raw)
		this.app.use(express.urlencoded({ extended: true })) // allow x-www-form-urlencoded
		this.app.use(compression())
		//  limit repeated requests to public APIs
		this.app.use(
			rateLimit({
				max: ONE_HUNDRED,
				windowMs: SIXTY * SIXTY * ONE_THOUSAND,
				message: 'Too many requests from this IP, please try again in one hour'
			})
		)

		// Test rest api
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.app.get('/', async (_req: Request, res: Response): Promise<any> => {
			try {
				return res.status(HttpCode.OK).send({
					message: `Welcome to Initial API! \n Endpoints available at http://localhost:${this.port}/`
				})
			} catch (error) {
				return res.status(HttpCode.INTERNAL_SERVER_ERROR).send({
					message: 'An error occurred while processing your request.',
					error: (error as Error).message
				})
			}
		})

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`)
		})
	}
}
