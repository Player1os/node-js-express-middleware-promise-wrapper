declare module 'stoppable' {
	import { Server } from 'http'

	interface IStoppableServer extends Server {
		stop: (callback: (err: null | Error, result: any) => void) => void
	}

	function stoppable(server: Server, timeout: number): IStoppableServer

	namespace stoppable {}

	export = stoppable
}
