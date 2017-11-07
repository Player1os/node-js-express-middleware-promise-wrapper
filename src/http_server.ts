// Load npm modules.
import * as stoppable from 'stoppable'

// Load node modules.
import * as http from 'http'

// Promisify callback libraries.
Promise.promisifyAll(http)

export interface IPromisifiedHttpServer extends http.Server {
	listenAsync(port: number, hostname: string): PromiseLike<void>
}

export type THttpServerRequestListener = (request: http.IncomingMessage, response: http.ServerResponse) => void

export class HttpServer {
	protected _server: IPromisifiedHttpServer
	protected _stop: () => PromiseLike<void>

	public constructor(requestListener: THttpServerRequestListener, timeout = 5000) {
		this._server = http.createServer(requestListener) as IPromisifiedHttpServer
		this._stop = Promise.promisify(stoppable(this._server, timeout).stop)
	}

	public async listen(port: number, ipAddress: string) {
		await this._server.listenAsync(port, ipAddress)
	}

	public async stop() {
		await this._stop()
	}
}
