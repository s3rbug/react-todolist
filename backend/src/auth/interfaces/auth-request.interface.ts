import { Request } from "express"

import { User } from "./../../users/user.schema"

export interface AuthRequest extends Request {
	user: User
}
