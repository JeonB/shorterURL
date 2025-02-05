import { envs } from './core/config/env'
import { Server } from './server'
import connection from './core/config/db'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
;(() => {
	main()
})()

function main(): void {
	const server = new Server({
		port: envs.PORT,
		apiPrefix: envs.API_PREFIX
	})
	void server.start()
}

connection.connect()
connection.query('SELECT * from Urls', (err, rows) => {
	if (err) {
		console.log(err)
	} else {
		console.log(rows)
	}
})
connection.end()
