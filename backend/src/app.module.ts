import { GoalsModule } from './folders/goals/goals.module';
import { TagsModule } from './folders/tags/tags.module';
import { FoldersModule } from './folders/folders.module';
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
        FoldersModule,
        TagsModule,
        GoalsModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
        MongooseModule.forRoot(process.env.MONGO_DB_LINK)],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}