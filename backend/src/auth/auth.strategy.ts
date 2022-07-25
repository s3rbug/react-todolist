import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { User } from './../users/user.schema';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.SECRET_KEY}`,
            ignoreExpiration: false,
        })
    }
    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.authService.validateUser(payload)
        if(!user){
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
        }
        return user
    }
}