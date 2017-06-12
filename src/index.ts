// Load npm modules.
import {
	NextFunction,
	Request,
	Response,
} from 'express'

// Define the passthrough objects.
const nextObject = {
	route: {},
}

// Converts a promise into a callback that is acceptable by express.
// If any of the special objects is returned as the result of the promise the next function is called.
// Otherwise no following middleware is executed.
const factory = (promiseGenerator: (req: Request, res: Response, next?: { route: object }) => Promise<void | object>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(promiseGenerator(req, res, nextObject))
			.then((result: object) => {
				if (result === nextObject) {
					// If the nextObject itself was returned, the next middleware
					// (passed in the same router call) is executed.
					process.nextTick(() => {
						next()
					})
				} else if (result === nextObject.route) {
					// If the nextObject was returned, the next middleware
					// (passed in the following router call) is executed.
					process.nextTick(() => {
						next('route')
					})
				}
			})
			.catch((err) => {
				// If an error is thrown within the promise the error middleware is executed.
				process.nextTick(() => {
					next(err)
				})
			})
	}
}

// Expose the factory function.
export default factory
