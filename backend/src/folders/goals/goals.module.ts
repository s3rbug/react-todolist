import { User, UserSchema } from './../../users/user.schema';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
        ])
    ],
    controllers: [GoalsController],
    providers: [GoalsService]
})
export class GoalsModule {}