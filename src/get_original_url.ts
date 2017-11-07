// Load npm modules.
import { Request } from 'express'

// Load node modules.
import { URL } from 'url'

export default (req: Request) => {
	return new URL(`${req.protocol}://${req.headers.host}${req.originalUrl}`).toString()
}
