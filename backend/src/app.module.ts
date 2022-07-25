import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Global()
@Module({
    imports: [
        UsersModule,
        AuthModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
        MongooseModule.forRoot(process.env.MONGO_DB_LINK)],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}