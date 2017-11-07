// Load npm modules.
import { Request } from 'express'

export default (req: Request) => {
	// Store the result for the standard and the custom method of retrieving the result.
	return (typeof req.ip === 'string') && (req.ip !== '') && (req.ip !== 'unknown')
		? req.ip
		: null
}
