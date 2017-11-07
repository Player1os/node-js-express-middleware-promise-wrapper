// Load npm modules.
import { Request } from 'express'
export interface IRequest extends Request {
	locals: {
		date: Date,
	},
}
