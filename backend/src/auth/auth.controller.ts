import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"

import { JwtAuthGuard } from "./auth.guard"
import { LoginUserDto } from "./../users/dto/login-user.dto"
import { CreateUserDto } from "./../users/dto/create-user.dto"
import { AuthService } from "./auth.service"
import { AuthRequest } from "./interfaces/auth-request.interface"

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	async login(@Body() userDto: LoginUserDto) {
		return await this.authService.login(userDto)
	}

	@Post("register")
	async register(@Body() userDto: CreateUserDto) {
		return await this.authService.register(userDto)
	}
}
