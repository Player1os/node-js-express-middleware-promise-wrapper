// Load npm modules.
import {
	NextFunction,
	Request,
	Response,
} from 'express'
import * as httpStatus from 'http-status'

export default (callback?: (err: Error, req: Request, res: Response) => void) => {
	return (err: Error, req: Request, res: Response, _next: NextFunction) => {
		// Check if the response was already sent.
		if (!res.headersSent) {
			// There was an error somewhere during route matching
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
		}

		// Execute the custom callback
		if (callback !== undefined) {
			callback(err, req, res)
		}

		// Throw the error for external handling.
		process.nextTick(() => {
			throw err
		})
	}
}
