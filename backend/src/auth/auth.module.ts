import { JwtStrategy } from './auth.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from './../users/users.module';
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: `${process.env.SECRET_KEY}`,
                signOptions: {
                    expiresIn: `${process.env.EXPIRES_IN}`
                }
            })
        }),      
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}