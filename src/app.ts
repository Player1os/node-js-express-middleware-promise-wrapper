// Load local modules.
import { IRequest } from '.../src/type/request.i'

// Load npm modules.
import * as express from 'express'

export default () => {
	// Initialize the express app.
	const app = express()

	// Initialize the request locals object.
	app.use((req: IRequest, _res, next) => {
		// Define the locals property as an object containing the date when the request was recieved.
		req.locals = {
			date: new Date(),
		}

		// Continue execution.
		next()
	})

	// Return the configured.
	return app as express.Application
}
