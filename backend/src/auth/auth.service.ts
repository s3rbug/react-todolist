import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'

import { JwtPayload } from './interfaces/payload.interface';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { User } from './../users/user.schema';
import { JwtLoginPayload } from './interfaces/login-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(payload: JwtPayload): Promise<User> {
        const user = await this.usersService.findUserByUsername(payload.username)
        if(!user){
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
        }
        return user
    }

    async login({username, password}: JwtLoginPayload) {
        const user = await this.usersService.findUserByUsername(username)
    
        if(!user){
            throw new HttpException(`User ${username} does not exist`, HttpStatus.BAD_REQUEST)
        }
        const passwordMatches = await bcrypt.compare(password, user.password)
        if(!passwordMatches){
            throw new HttpException(`Wrong password`, HttpStatus.BAD_REQUEST)
        }

        const token = this._createToken(user)
        return {
            username: username,
            ...token
        }
    }

    async register(userDto: CreateUserDto): Promise<User>{
        try {
            const hashPassword = await bcrypt.hash(userDto.password, 5)
            return await this.usersService.create(
                {
                    ...userDto,
                    password: hashPassword
                }
            )
        }
        catch (err) {
            throw new HttpException(`Invalid user data ${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }

    private _createToken({username}: User): TokenType{
        const expiresIn = `${process.env.EXPIRES_IN}`

        const user: JwtPayload = {username}
        const accessToken = this.jwtService.sign(user)
        
        return {
            expiresIn,
            accessToken
        }
    }
}