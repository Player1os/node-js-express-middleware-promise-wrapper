// Load npm modules.
import * as bodyParser from 'body-parser'
import {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
	Router,
} from 'express'

export const json = (errorRequestHandler: ErrorRequestHandler) => {
	// Parse the request payload for the application/json mime type.
	const router = Router()
	router.use(bodyParser.json())

	// Catch all unparsable payload errors.
	router.use((err: Error | null | undefined, req: Request, res: Response, next: NextFunction) => {
		if ((err === undefined) || (err === null)) {
			next()
		} else {
			errorRequestHandler(err, req, res, next)
		}
	})
}
