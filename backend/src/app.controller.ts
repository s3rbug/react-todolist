import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";

@Controller()
export class AppController {
    constructor(
        private appService: AppService,
        private authService: AuthService
        ) {}
}