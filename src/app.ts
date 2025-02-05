import { envs } from './core/config/env';
import { Server } from './server';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(() => {
	main();
})();

function main(): void {
	const server = new Server({
		port: envs.PORT,
		apiPrefix: envs.API_PREFIX
	});
	void server.start();
}
