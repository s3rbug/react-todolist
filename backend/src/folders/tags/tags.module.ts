import { User, UserSchema } from "./../../users/user.schema"
import { MongooseModule } from "@nestjs/mongoose"
import { Module } from "@nestjs/common"
import { TagsController } from "./tags.controller"
import { TagsService } from "./tags.service"

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	controllers: [TagsController],
	providers: [TagsService],
})
export class TagsModule {}
