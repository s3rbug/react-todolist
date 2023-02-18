import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
	UseGuards,
} from "@nestjs/common"

import { JwtAuthGuard } from "./../auth/auth.guard"
import { User } from "./user.schema"
import { CreateUserDto } from "./dto/create-user.dto"
import { UsersService } from "./users.service"
import { AuthRequest } from "src/auth/interfaces/auth-request.interface"

@Controller("users")
export class UsersController {
	constructor(private usersService: UsersService) {}

	// @Post()
	// async create(@Body() userDto: CreateUserDto): Promise<User | undefined>{
	//     return this.usersService.create(userDto)
	// }

	@Get()
	async getAll(): Promise<User[]> {
		return this.usersService.getAll()
	}

	@Get(":username")
	async getByUserName(
		@Param("username") username: string
	): Promise<User | undefined> {
		return this.usersService.findUserByUsername(username)
	}
}
